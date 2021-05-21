const UI_SELECTOR_STRING = "new UiSelector()";
const DOT_OPERATOR = ".";

export const getChildren = (node: any) => {
    const values: Array<any> = Object.values(node);
    values.shift();
    return [].concat(...values);
};

function uiSelectorMethodInit(method: string, param: string | number) {
    if (typeof param === "string") return `${method}("${param}")`;
    else return `${method}(${param})`;
}

export function generateScript(element: any): string {
    let initString = UI_SELECTOR_STRING;
    if (element.class) {
        initString +=
            DOT_OPERATOR + uiSelectorMethodInit("className", element.class);
    }
    if (element.text) {
        initString += DOT_OPERATOR + uiSelectorMethodInit("text", element.text);
    }
    if (element["resource-id"]) {
        initString +=
            DOT_OPERATOR +
            uiSelectorMethodInit("resourceId", element["resource-id"]);
    }
    if (element.description) {
        initString +=
            DOT_OPERATOR +
            uiSelectorMethodInit("description", element.description);
    }
    if (element.index) {
        initString +=
            DOT_OPERATOR + uiSelectorMethodInit("index", +element.index);
    }
    if (element["content-desc"] && !element.description) {
        initString +=
            DOT_OPERATOR +
            uiSelectorMethodInit("description", element["content-desc"]);
    }
    return initString;
}

export function generateRandomLocator(xmlJson: any) {
    let randomElement: any;
    function traverseTree(json: any) {
        if (!json) return;
        const children = getChildren(json);
        const total = children.length;

        for (let i = 0; i < total - 1; i++) {
            traverseTree(children[i]);
        }
        console.log(json["$"]);

        if (json["$"]["resource-id"] || json["$"].index) {
            randomElement = json["$"];
        }
        //TODO
        traverseTree(children[total - 1]);
    }
    console.log(xmlJson);

    traverseTree(xmlJson.hierarchy);
    return generateScript(randomElement);
}
