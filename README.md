# Ping Pong Score

Mobile application for table tennis scoring, built with NativeScript-Vue.

## Features

- Points and sets scoring
- Automatic service management
- Voice control for adding points
- Sets history
- Intuitive and modern user interface
- Voice announcements

## Prerequisites

- Node.js 16 or higher
- JDK 11 or higher (for Android)
- Android Studio with Android SDK (for Android)
- Xcode 12 or higher (for iOS, Mac only)
- NativeScript CLI (`npm install -g nativescript`)

## Installation

1. Clone the project
2. Install dependencies:
```bash
npm install
```

## Development

To run the application in development mode:

```bash
# Android
ns run android

# iOS (Mac only)
ns run ios
```

## Building Applications

### Android (APK)

1. Generate a keystore file:
```bash
keytool -genkey -v -keystore my-release-key.keystore -alias your_alias -keyalg RSA -keysize 2048 -validity 10000
```
- You will be prompted to:
  - Create a keystore password
  - Enter your details (name, organization, etc.)
  - Create a key password

2. Move the keystore to the correct location:
```bash
mv my-release-key.keystore App_Resources/Android/
```

3. Configure signing in `App_Resources/Android/app.gradle`:
```gradle
android {
  signingConfigs {
    release {
      storeFile file("my-release-key.keystore")
      storePassword "your_keystore_password"
      keyAlias "your_alias"
      keyPassword "your_key_password"
    }
  }
  
  buildTypes {
    release {
      signingConfig signingConfigs.release
    }
  }
}
```

4. Generate production APK:
```bash
ns build android --release --key-store-path App_Resources/Android/my-release-key.keystore --key-store-password your_keystore_password --key-store-alias your_alias --key-store-alias-password your_key_password
```

The APK will be generated at: `platforms/android/app/build/outputs/apk/release/app-release.apk`

IMPORTANT: Keep your keystore file and passwords secure. You'll need the same keystore for all future updates of your app.

### iOS (App Store)

1. Configure certificates in Xcode:
   - Open Xcode project (`platforms/ios/myapp.xcworkspace`)
   - In "Signing & Capabilities", select your development team
   - Configure Bundle ID

2. Generate App Store archive:
```bash
ns build ios --release --for-device --team-id YOUR_TEAM_ID
```

3. Open Xcode and use "Archive" to submit the app to the App Store

## Project Structure

```
├── app/                    # Application source code
│   ├── components/        # Vue components
│   ├── composables/       # Reusable logic
│   └── styles/           # Style files
├── App_Resources/         # Native resources (Android/iOS)
└── nativescript.config.ts # NativeScript configuration
```

## Testing

```bash
npm run test
```

## Contributing

1. Fork the project
2. Create a branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.