# Imagem de execução dos testes mobile Android (WebdriverIO + Appium).
# Traz Node, Java, Android SDK (sem emulador) e os drivers do Appium.
# O emulador NÃO vai dentro da imagem: ele precisa de KVM. Use um runner com emulador
# (veja .github/workflows/mobile-tests.yml), um device conectado ou um device farm.

FROM node:22-bookworm

ARG CMDLINE_TOOLS_VERSION=11076708
ARG ANDROID_API=34
ARG BUILD_TOOLS=34.0.0

ENV ANDROID_HOME=/opt/android-sdk \
    ANDROID_SDK_ROOT=/opt/android-sdk
ENV PATH="${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools"

RUN apt-get update \
    && apt-get install -y --no-install-recommends openjdk-17-jdk-headless curl unzip ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Android SDK (command line tools + platform-tools + platform)
RUN mkdir -p "${ANDROID_HOME}/cmdline-tools" \
    && curl -fsSL -o /tmp/cmdline-tools.zip \
       "https://dl.google.com/android/repository/commandlinetools-linux-${CMDLINE_TOOLS_VERSION}_latest.zip" \
    && unzip -q /tmp/cmdline-tools.zip -d "${ANDROID_HOME}/cmdline-tools" \
    && mv "${ANDROID_HOME}/cmdline-tools/cmdline-tools" "${ANDROID_HOME}/cmdline-tools/latest" \
    && rm /tmp/cmdline-tools.zip \
    && yes | sdkmanager --licenses > /dev/null \
    && sdkmanager "platform-tools" "platforms;android-${ANDROID_API}" "build-tools;${BUILD_TOOLS}"

WORKDIR /app

# Dependências primeiro, para aproveitar o cache de camadas do Docker
COPY package*.json ./
RUN npm install \
    && npx appium driver install uiautomator2

COPY . .

# Por padrão roda os testes Android. Credenciais e app entram por variáveis de ambiente:
#   docker run --rm -e USER_EMAIL=... -e USER_PASSWORD=... -e APP_PATH=/app/apps/android/app.apk <imagem>
CMD ["npm", "run", "test:android"]
