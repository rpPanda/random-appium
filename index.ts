import { attach, remote, RemoteOptions } from 'webdriverio';
import * as Geocode from 'react-geocode';
import ApkReader from 'adbkit-apkreader';
import { generateRandomLocator } from './selector';
import yml2json from 'js-yaml';
import fs from 'fs';
const capabilities: WebDriver.DesiredCapabilities = {
  platformName: 'Android',
  //@ts-ignore
  'appium:unicodeKeyboard': true,
  'appium:resetKeyboard': true,
  'appium:automationName': 'UiAutomator2',
  'appium:newCommandTimeout': 6000,
  'appium:ignoreUnimportantViews': true,
  'appium:fullReset': false,
  'appium:gpsEnabled': true,
  'appium:udid': 'emulator-5554',
  'appium:autoGrantPermissions': true,
  'appium:isHeadless': true,
};
const forceWait = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};
const options: RemoteOptions = {
  path: '/wd/hub',
  hostname: 'localhost',
  port: 4444,
  capabilities: capabilities,
};
const main = async () => {
  const driver = await remote({
    ...options,
    capabilities: {
      'appium:app': '/Users/apple/Downloads/app-debug.apk',
      ...capabilities,
    },
  });

  await driver.setImplicitTimeout(3000);
  // await driver.setGeoLocation({
  //     latitude: 121,
  //     longitude: 11,
  //     altitude: 94,
  // });
  const latitude = -15;
  const longitude = 50;
  const altitude = 23;
  await driver.executeScript('mobile:shell', [
    {
      command: 'am',
      args: 'start -W -n io.appium.settings/.Settings -a android.intent.action.MAIN -c android.intent.category.LAUNCHER -f 0x10200000'.split(
        ' '
      ),
    },
  ]);
  await driver.executeScript('mobile:shell', [
    {
      command: 'appops',
      args: 'set io.appium.settings android:mock_location allow'.split(' '),
    },
  ]);
  await driver.executeScript('mobile:shell', [
    {
      command: 'am',
      args: `startservice -e longitude ${longitude} -e latitude ${latitude} -e altitude ${altitude} io.appium.settings/.LocationService;`.split(
        ' '
      ),
    },
  ]);
  await driver.getGeoLocation();
  await forceWait(2000);
  await driver.touchPerform([
    { action: 'press', options: { x: 800, y: 1000 } },
    { action: 'release' },
  ]);

  await forceWait(2000);
  await driver.sendKeys(['1', '0']);
  await forceWait(2000);
  await driver.sendSms('+918777858709', 'call me maybe');
  await forceWait(2000);
  await driver.openNotifications();
  await forceWait(2000);
  await driver.executeScript('mobile: getNotifications', [{}]);
  await forceWait(2000);
  await driver.deleteSession();
};

// main();

// function main2() {
//     const a = [1, 2, 3];
//     const b = [4, 5, 6];
//     b.unshift(...a);
//     console.log(b);
// }

// main2();

// function main3() {
//     const varVal = {
//         headed: "something good",
//         no: "hell no",
//         ho: "ho ho ho",
//         ko: "kremlin",
//     };
//     let str = "Where is this ${headed} ${no} ${ho} ${ko}?";
//     const regex = /(?<=\${).+?(?=\})/g;
//     const vars = str.match(regex);

//     const varVals = vars.map((vari) => {
//         return varVal[vari];
//     });
//     console.log(vars);
//     for (let vari of vars) {
//         str = str.replace("$" + `{${vari}}`, `${varVal[vari]}`);
//     }
//     console.log(str);
// }

// main3();

function main4() {
  ApkReader.open(
    '/Users/apple/Downloads/com.sts.flutter/com.sts.flutter-106-apkplz.net.apk'
  )
    .then((reader: { readManifest: () => any }) => reader.readManifest())
    .then((manifest: any) =>
      console.log(
        JSON.stringify(manifest)
        // manifest.application.activities.filter(
        //   (activity: any) =>
        //     activity.intentFilters.length > 0 &&
        //     activity.intentFilters.filter((intent: any) =>
        //       intent.categories.some(
        //         (category: any) =>
        //           category.name === 'android.intent.category.LAUNCHER'
        //       )
        //     ).length > 0
        // )[0]
      )
    );
}
main4();
const extractLauncherActivity = (manifest: any) => {
  return manifest.application.activities.filter(
    (activity: any) =>
      activity.intentFilters.length > 0 &&
      activity.intentFilters.filter((intent: any) =>
        intent.categories.some(
          (category: any) =>
            category.name === 'android.intent.category.LAUNCHER'
        )
      ).length > 0
  )[0].name;
};

// main4();

const xmlJson = {
  hierarchy: {
    $: {
      index: '0',
      class: 'hierarchy',
      rotation: '0',
      width: '1080',
      height: '2040',
    },
    'android.widget.FrameLayout': [
      {
        $: {
          index: '0',
          package: 'com.classengage.android',
          class: 'android.widget.FrameLayout',
          text: '',
          checkable: 'false',
          checked: 'false',
          clickable: 'false',
          enabled: 'true',
          focusable: 'false',
          focused: 'false',
          'long-clickable': 'false',
          password: 'false',
          scrollable: 'false',
          selected: 'false',
          bounds: '[0,0][1080,2040]',
          displayed: 'true',
        },
        'android.widget.ScrollView': [
          {
            $: {
              index: '0',
              package: 'com.classengage.android',
              class: 'android.widget.ScrollView',
              text: '',
              checkable: 'false',
              checked: 'false',
              clickable: 'false',
              enabled: 'true',
              focusable: 'true',
              focused: 'false',
              'long-clickable': 'false',
              password: 'false',
              scrollable: 'false',
              selected: 'false',
              bounds: '[0,60][1080,1990]',
              displayed: 'true',
            },
            'android.widget.TextView': [
              {
                $: {
                  index: '0',
                  package: 'com.classengage.android',
                  class: 'android.widget.TextView',
                  text: 'Welcome to',
                  'resource-id': 'com.classengage.android:id/welcome_text',
                  checkable: 'false',
                  checked: 'false',
                  clickable: 'false',
                  enabled: 'true',
                  focusable: 'false',
                  focused: 'false',
                  'long-clickable': 'false',
                  password: 'false',
                  scrollable: 'false',
                  selected: 'false',
                  bounds: '[408,613][673,680]',
                  displayed: 'true',
                },
              },
              {
                $: {
                  index: '1',
                  package: 'com.classengage.android',
                  class: 'android.widget.TextView',
                  text: 'ClassEngage',
                  'resource-id': 'com.classengage.android:id/app_name_text',
                  checkable: 'false',
                  checked: 'false',
                  clickable: 'false',
                  enabled: 'true',
                  focusable: 'false',
                  focused: 'false',
                  'long-clickable': 'false',
                  password: 'false',
                  scrollable: 'false',
                  selected: 'false',
                  bounds: '[394,680][687,747]',
                  displayed: 'true',
                },
              },
              {
                $: {
                  index: '2',
                  package: 'com.classengage.android',
                  class: 'android.widget.TextView',
                  text: 'Login via OTP',
                  'resource-id':
                    'com.classengage.android:id/login_via_otp_text',
                  checkable: 'false',
                  checked: 'false',
                  clickable: 'false',
                  enabled: 'true',
                  focusable: 'false',
                  focused: 'false',
                  'long-clickable': 'false',
                  password: 'false',
                  scrollable: 'false',
                  selected: 'false',
                  bounds: '[417,790][663,844]',
                  displayed: 'true',
                },
              },
              {
                $: {
                  index: '5',
                  package: 'com.classengage.android',
                  class: 'android.widget.TextView',
                  text: 'Continue',
                  'resource-id': 'com.classengage.android:id/login_button',
                  checkable: 'false',
                  checked: 'false',
                  clickable: 'true',
                  enabled: 'true',
                  focusable: 'true',
                  focused: 'false',
                  'long-clickable': 'false',
                  password: 'false',
                  scrollable: 'false',
                  selected: 'false',
                  bounds: '[68,1050][1012,1170]',
                  displayed: 'true',
                },
              },
              {
                $: {
                  index: '6',
                  package: 'com.classengage.android',
                  class: 'android.widget.TextView',
                  text: 'Signin via email',
                  'resource-id': 'com.classengage.android:id/signin_via_email',
                  checkable: 'false',
                  checked: 'false',
                  clickable: 'true',
                  enabled: 'true',
                  focusable: 'true',
                  focused: 'false',
                  'long-clickable': 'false',
                  password: 'false',
                  scrollable: 'false',
                  selected: 'false',
                  bounds: '[417,1205][664,1252]',
                  displayed: 'true',
                },
              },
              {
                $: {
                  index: '7',
                  package: 'com.classengage.android',
                  class: 'android.widget.TextView',
                  text: "I'm a Faculty",
                  'resource-id': 'com.classengage.android:id/faculty_button',
                  checkable: 'false',
                  checked: 'false',
                  clickable: 'true',
                  enabled: 'true',
                  focusable: 'true',
                  focused: 'false',
                  'long-clickable': 'false',
                  password: 'false',
                  scrollable: 'false',
                  selected: 'false',
                  bounds: '[360,1558][720,1666]',
                  displayed: 'true',
                },
              },
              {
                $: {
                  index: '8',
                  package: 'com.classengage.android',
                  class: 'android.widget.TextView',
                  text: 'By joining our app, you agree to our',
                  'resource-id': 'com.classengage.android:id/joining_app_text',
                  checkable: 'false',
                  checked: 'false',
                  clickable: 'false',
                  enabled: 'true',
                  focusable: 'false',
                  focused: 'false',
                  'long-clickable': 'false',
                  password: 'false',
                  scrollable: 'false',
                  selected: 'false',
                  bounds: '[238,1896][843,1943]',
                  displayed: 'true',
                },
              },
              {
                $: {
                  index: '9',
                  package: 'com.classengage.android',
                  class: 'android.widget.TextView',
                  text: 'Terms of Service',
                  'resource-id':
                    'com.classengage.android:id/terms_of_service_text',
                  checkable: 'false',
                  checked: 'false',
                  clickable: 'false',
                  enabled: 'true',
                  focusable: 'false',
                  focused: 'false',
                  'long-clickable': 'false',
                  password: 'false',
                  scrollable: 'false',
                  selected: 'false',
                  bounds: '[408,1943][672,1990]',
                  displayed: 'true',
                },
              },
            ],
            'android.widget.RelativeLayout': [
              {
                $: {
                  index: '3',
                  package: 'com.classengage.android',
                  class: 'android.widget.RelativeLayout',
                  text: '',
                  'resource-id': 'com.classengage.android:id/rlClickConsumer',
                  checkable: 'false',
                  checked: 'false',
                  clickable: 'true',
                  enabled: 'true',
                  focusable: 'true',
                  focused: 'false',
                  'long-clickable': 'false',
                  password: 'false',
                  scrollable: 'false',
                  selected: 'false',
                  bounds: '[103,910][343,1011]',
                  displayed: 'true',
                },
                'android.widget.TextView': [
                  {
                    $: {
                      index: '0',
                      package: 'com.classengage.android',
                      class: 'android.widget.TextView',
                      text: ' US  +1',
                      'resource-id':
                        'com.classengage.android:id/textView_selectedCountry',
                      checkable: 'false',
                      checked: 'false',
                      clickable: 'false',
                      enabled: 'true',
                      focusable: 'false',
                      focused: 'false',
                      'long-clickable': 'false',
                      password: 'false',
                      scrollable: 'false',
                      selected: 'false',
                      bounds: '[123,930][263,991]',
                      displayed: 'true',
                    },
                  },
                ],
              },
            ],
            'android.widget.EditText': [
              {
                $: {
                  index: '4',
                  package: 'com.classengage.android',
                  class: 'android.widget.EditText',
                  text: 'Phone Number',
                  'resource-id': 'com.classengage.android:id/email_input',
                  checkable: 'false',
                  checked: 'false',
                  clickable: 'true',
                  enabled: 'true',
                  focusable: 'true',
                  focused: 'true',
                  'long-clickable': 'true',
                  password: 'false',
                  scrollable: 'false',
                  selected: 'false',
                  bounds: '[356,904][1012,1017]',
                  displayed: 'true',
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

// console.log(generateRandomLocator(xmlJson));
// fs.readFile("test.yml", "utf8", function (err, data) {
//     const xyz = yml2json.load(data);
//     // const z = yml2json.dump(xyz);
//     console.log(JSON.stringify(xyz));
// });
interface replaceKeys<T, R> {
  old: keyof T;
  new: keyof R;
}
type ValueOf<T> = T extends ReadonlyArray<any> ? T[number] : T[keyof T];
const filteredArray = <T>(array1: T[], array2: T[]) =>
  array1.filter((value) => array2.includes(value));
type ReplacedMap<Type> = {
  [Property in keyof Type]?: 'pk' | 'sk' | 'ak';
};
// type newRec<T,R> = Record<keyof R,Omit<R,keyof T> & Record<ValueOf<T>,any>>
const newRec = <R, T extends ReplacedMap<R>>(act: R, obj: T) => {
  const commonKeys = filteredArray(Object.keys(act), Object.keys(obj));
  let sss = act;
  let aaa: any = {};
  for (const key of commonKeys) {
    aaa[obj[key]] = act[key];
    delete sss[key];
  }
  return {
    ...(sss as Omit<R, keyof T>),
    ...(aaa as Record<ValueOf<T>, any>),
  };
};

const renameKey = <
  OldKey extends keyof T,
  NewKey extends string,
  T extends Record<string, any>
>(
  oldKey: OldKey,
  newKey: NewKey extends keyof T ? any : NewKey,
  userObject: T
): Record<NewKey, T[OldKey]> & Omit<T, OldKey> => {
  const { [oldKey]: value, ...common } = userObject;
  return {
    ...common,
    ...({ [newKey as unknown as string]: value } as Record<NewKey, T[OldKey]>),
  };
};

interface X {
  a: number;
  b: string;
}

const varArgs = (...args: string[]) => {
  return args.map((arg) => {
    console.log(arg);
  });
};
function main5() {
  varArgs('abc', 'sd', 'er');
}
// main5();
