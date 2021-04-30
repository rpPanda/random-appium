import { attach, remote, RemoteOptions } from "webdriverio";
import Geocode from "react-geocode";
const capabilities: WebDriver.DesiredCapabilities = {
    platformName: "Android",
    //@ts-ignore
    "appium:unicodeKeyboard": true,
    "appium:resetKeyboard": true,
    "appium:automationName": "UiAutomator2",
    "appium:newCommandTimeout": 6000,
    "appium:ignoreUnimportantViews": true,
    "appium:fullReset": false,
    "appium:gpsEnabled": true,
    "appium:udid": "emulator-5554",
    "appium:autoGrantPermissions": true,
    "appium:isHeadless": true,
};

const options: RemoteOptions = {
    path: "/wd/hub",
    hostname: "localhost",
    port: 4444,
    capabilities: capabilities,
};
const main = async () => {
    const driver = await remote({
        ...options,
        capabilities: {
            "appium:app":
                "https://workduck-app-files.s3.us-east-1.amazonaws.com/public/1619786164493-classengage?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWC4HMNTXPRORHMPI%2F20210430%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210430T130933Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=e7a521f74bddddbb4528118077dee1db8903785316166d0dd6f5753fe11892cb",
            ...capabilities,
        },
    });
    const capab: any = driver.capabilities;
    console.log("CAPABLITIES", capab);

    await driver.setImplicitTimeout(3000);
    // await driver.setGeoLocation({
    //     latitude: 121,
    //     longitude: 11,
    //     altitude: 94,
    // });
    const latitude = -15;
    const longitude = 50;
    const altitude = 23;
    await driver.executeScript("mobile:shell", [
        {
            command: "am",
            args: "start -W -n io.appium.settings/.Settings -a android.intent.action.MAIN -c android.intent.category.LAUNCHER -f 0x10200000".split(
                " "
            ),
        },
    ]);
    await driver.executeScript("mobile:shell", [
        {
            command: "appops",
            args: "set io.appium.settings android:mock_location allow".split(
                " "
            ),
        },
    ]);
    await driver.executeScript("mobile:shell", [
        {
            command: "am",
            args: `startservice -e longitude ${longitude} -e latitude ${latitude} -e altitude ${altitude} io.appium.settings/.LocationService;`.split(
                " "
            ),
        },
    ]);
    await driver.getGeoLocation();
    await driver.deleteSession();
};

main();
