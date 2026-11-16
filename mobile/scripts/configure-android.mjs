import fs from 'fs';
import path from 'path';

const root = process.cwd();
const resourcesDir = path.join(root, 'resources');
const androidResDir = path.join(root, 'android', 'app', 'src', 'main', 'res');
const manifestPath = path.join(root, 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
const stringsPath = path.join(androidResDir, 'values', 'strings.xml');
const gradlePath = path.join(root, 'android', 'app', 'build.gradle');

// 1. Copy generated mipmap launcher icons & splash image
const densities = ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'];
for (const density of densities) {
  const srcIcon = path.join(resourcesDir, `mipmap-${density}`, 'ic_launcher.png');
  const destDir = path.join(androidResDir, `mipmap-${density}`);
  if (fs.existsSync(srcIcon) && fs.existsSync(destDir)) {
    fs.copyFileSync(srcIcon, path.join(destDir, 'ic_launcher.png'));
    fs.copyFileSync(srcIcon, path.join(destDir, 'ic_launcher_round.png'));
    fs.copyFileSync(srcIcon, path.join(destDir, 'ic_launcher_foreground.png'));
  }
}

const splashSrc = path.join(resourcesDir, 'drawable', 'splash.png');
const drawableDir = path.join(androidResDir, 'drawable');
if (fs.existsSync(splashSrc)) {
  fs.mkdirSync(drawableDir, { recursive: true });
  fs.copyFileSync(splashSrc, path.join(drawableDir, 'splash.png'));
}

// 2. Update strings.xml with custom app display name
if (fs.existsSync(stringsPath)) {
  const xml = `<?xml version='1.0' encoding='utf-8'?>
<resources>
    <string name="app_name">Screenshot to Webpage</string>
    <string name="title_activity_main">Screenshot to Webpage</string>
    <string name="package_name">com.lovable.screenshottowebpage</string>
    <string name="custom_url_scheme">com.lovable.screenshottowebpage</string>
</resources>
`;
  fs.writeFileSync(stringsPath, xml, 'utf8');
}

// 3. Patch build.gradle versionName & versionCode
if (fs.existsSync(gradlePath)) {
  let gradle = fs.readFileSync(gradlePath, 'utf8');
  gradle = gradle.replace(/versionCode\s+\d+/, 'versionCode 1');
  gradle = gradle.replace(/versionName\s+"[^"]+"/, 'versionName "1.0.0"');
  fs.writeFileSync(gradlePath, gradle, 'utf8');
}

// 4. Patch AndroidManifest.xml orientation & cleartext rules
if (fs.existsSync(manifestPath)) {
  let manifest = fs.readFileSync(manifestPath, 'utf8');
  // Cleartext traffic remains disabled
  if (!manifest.includes('android:screenOrientation')) {
    manifest = manifest.replace('<activity', '<activity android:screenOrientation="portrait"');
  }
  fs.writeFileSync(manifestPath, manifest, 'utf8');
}

console.log('Android wrapper resources configured successfully.');
