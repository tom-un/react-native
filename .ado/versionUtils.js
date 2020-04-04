// @ts-check
const fs = require("fs");
const path = require("path");

const pkgJsonPath = path.resolve(__dirname, "../package.json");
const publishBranchName = process.env.BUILD_SOURCEBRANCH.match(/refs\/heads\/(.*)/)[1];

function gatherVersionInfo() {
    let pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));

    let releaseVersion = pkgJson.version;
    const branchVersionSuffix = (publishBranchName.match(/(fb.*merge)|(fabric)/) ? `-${publishBranchName}` : '');

    return {pkgJson, releaseVersion, branchVersionSuffix};
}

function updateReactNativeMacOSInitVersionInFile() {
    const rnMacOSInitPkgJsonPath = path.resolve(__dirname, "../packages/react-native-macos-init/package.json");
    const rnMacOSInitPkgJson = JSON.parse(fs.readFileSync(rnMacOSInitPkgJsonPath, "utf8"));
    let rnMacOSInitReleaseVersion = rnMacOSInitPkgJson.version;
    const rnMacOSInitVersionStringRegEx = new RegExp(`([0-9]*)\\.([0-9]*)\\.([0-9]*)`);
    const rnMacOSInitVersionGroups = rnMacOSInitVersionStringRegEx.exec(rnMacOSInitReleaseVersion);
    if (rnMacOSInitVersionGroups) {
      rnMacOSInitReleaseVersion = rnMacOSInitVersionGroups[1] + '.' + rnMacOSInitVersionGroups[2] + '.' + (parseInt(rnMacOSInitVersionGroups[3]) + 1);
    } else {
      console.log("Invalid react-native-macos-init version to publish");
      process.exit(1);
    }
    rnMacOSInitPkgJson.version = rnMacOSInitReleaseVersion;
    fs.writeFileSync(rnMacOSInitPkgJsonPath, JSON.stringify(rnMacOSInitPkgJson, null, 2));
    console.log(`Updating ${rnMacOSInitPkgJsonPath} to version ${rnMacOSInitReleaseVersion}`);
}

function updateVersionsInFiles() {

    let {pkgJson, releaseVersion, branchVersionSuffix} = gatherVersionInfo();
  
    const versionStringRegEx = new RegExp(`(.*-microsoft)(-${publishBranchName})?\\.([0-9]*)`);
    const versionGroups = versionStringRegEx.exec(releaseVersion);
    if (versionGroups) {
      releaseVersion = versionGroups[1] + branchVersionSuffix + '.' + (parseInt(versionGroups[3]) + 1);
    } else {
      if (releaseVersion.indexOf("-") === -1) {
        releaseVersion = releaseVersion + `-microsoft${branchVersionSuffix}.0`;
      } else {
        console.log("Invalid version to publish");
        process.exit(1);
      }
    }
  
    pkgJson.version = releaseVersion;
    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
    console.log(`Updating package.json to version ${releaseVersion}`);
<<<<<<< HEAD

    updateReactNativeMacOSInitVersionInFile();
=======
>>>>>>> ms/master
  
    return {releaseVersion, branchVersionSuffix};
}

function updatePackageName(name) {
    let pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
    pkgJson.name = name;
    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
    console.log(`Updating package.json to name ${name}`);
}

module.exports = {
    gatherVersionInfo,
    publishBranchName,
    pkgJsonPath,
    updateVersionsInFiles,
    updatePackageName
}