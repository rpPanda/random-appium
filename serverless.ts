import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
    service: "workduck-api",
    package: { individually: true },
    useDotenv: true,
    custom: {
        bundle: { disableForkTsChecker: true, linting: false },
        "serverless-offline": { httpPort: 4000, lambdaPort: 4002 },
    },
    plugins: ["serverless-bundle", "serverless-offline"],
    provider: {
        name: "aws",
        runtime: "nodejs12.x",
        stage: "dev",
        region: "us-east-1",
        lambdaHashingVersion: "20201221",
        environment: { tableName: "${env:PRIMARY_TABLE}" },
        iam: {
            role: {
                statements: [
                    {
                        Effect: "Allow",
                        Action: [
                            "dynamodb:Scan",
                            "dynamodb:Query",
                            "dynamodb:GetItem",
                            "dynamodb:PutItem",
                            "dynamodb:UpdateItem",
                            "dynamodb:DeleteItem",
                            "dynamodb:DescribeTable",
                            "dynamodb:BatchWriteItem",
                            "dynamodb:BatchGetItem",
                        ],
                        Resource: "arn:aws:dynamodb:us-east-1:*:*",
                    },
                ],
            },
        },
    },
    resources: {
        Resources: {
            GatewayResponseDefault4XX: {
                Type: "AWS::ApiGateway::GatewayResponse",
                Properties: {
                    ResponseParameters: {
                        "gatewayresponse.header.Access-Control-Allow-Origin":
                            "'*'",
                        "gatewayresponse.header.Access-Control-Allow-Headers":
                            "'*'",
                    },
                    ResponseType: "DEFAULT_4XX",
                    RestApiId: { Ref: "ApiGatewayRestApi" },
                },
            },
            GatewayResponseDefault5XX: {
                Type: "AWS::ApiGateway::GatewayResponse",
                Properties: {
                    ResponseParameters: {
                        "gatewayresponse.header.Access-Control-Allow-Origin":
                            "'*'",
                        "gatewayresponse.header.Access-Control-Allow-Headers":
                            "'*'",
                    },
                    ResponseType: "DEFAULT_5XX",
                    RestApiId: { Ref: "ApiGatewayRestApi" },
                },
            },
        },
    },
    functions: {
        "create-user": {
            handler: "src/handler.createUser",
            events: [
                {
                    http: {
                        path: "users",
                        method: "post",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-user": {
            handler: "src/handler.getUser",
            events: [
                {
                    http: {
                        path: "users/{id}",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "update-user": {
            handler: "src/handler.updateUser",
            events: [
                {
                    http: {
                        path: "users",
                        method: "put",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "create-suite": {
            handler: "src/handler.createSuite",
            events: [
                {
                    http: {
                        path: "suites",
                        method: "post",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-suite": {
            handler: "src/handler.getSuite",
            events: [
                {
                    http: {
                        path: "suites/{id}",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "update-suite": {
            handler: "src/handler.updateSuite",
            events: [
                {
                    http: {
                        path: "suites",
                        method: "put",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "delete-suite": {
            handler: "src/handler.deleteSuite",
            events: [
                {
                    http: {
                        path: "suites/{id}",
                        method: "delete",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "create-test": {
            handler: "src/handler.createTest",
            events: [
                {
                    http: {
                        path: "tests",
                        method: "post",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-test": {
            handler: "src/handler.getTest",
            events: [
                {
                    http: {
                        path: "tests/{id}",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-test-screens": {
            handler: "src/handler.getTestScreens",
            events: [
                {
                    http: {
                        path: "tests/{id}/screens",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-test-assertions": {
            handler: "src/handler.getTestAssertions",
            events: [
                {
                    http: {
                        path: "tests/{id}/assertions",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-test-variables": {
            handler: "src/handler.getTestVariables",
            events: [
                {
                    http: {
                        path: "tests/{id}/variables",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "delete-test": {
            handler: "src/handler.deleteTest",
            events: [
                {
                    http: {
                        path: "tests/{id}",
                        method: "delete",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "update-test": {
            handler: "src/handler.updateTest",
            events: [
                {
                    http: {
                        path: "tests",
                        method: "put",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-all-tests": {
            handler: "src/handler.getAllTests",
            events: [
                {
                    http: {
                        path: "tests",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "create-screen": {
            handler: "src/handler.createScreen",
            events: [
                {
                    http: {
                        path: "screens",
                        method: "post",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-screen": {
            handler: "src/handler.getScreen",
            events: [
                {
                    http: {
                        path: "screens/{id}",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "update-screen": {
            handler: "src/handler.updateScreen",
            events: [
                {
                    http: {
                        path: "screens",
                        method: "put",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "delete-screen": {
            handler: "src/handler.deleteScreen",
            events: [
                {
                    http: {
                        path: "screen/{id}",
                        method: "delete",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "create-assertion": {
            handler: "src/handler.createAssertion",
            events: [
                {
                    http: {
                        path: "assertions",
                        method: "post",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-assertion": {
            handler: "src/handler.getAssertions",
            events: [
                {
                    http: {
                        path: "assertions/{id}",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "update-assertion": {
            handler: "src/handler.updateAssertions",
            events: [
                {
                    http: {
                        path: "assertions",
                        method: "put",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "delete-assertion": {
            handler: "src/handler.deleteAssertions",
            events: [
                {
                    http: {
                        path: "assertion/{id}",
                        method: "delete",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "create-run": {
            handler: "src/handler.createRuns",
            events: [
                {
                    http: {
                        path: "run",
                        method: "post",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-run": {
            handler: "src/handler.getRuns",
            events: [
                {
                    http: {
                        path: "run/{id}",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-all-runs": {
            handler: "src/handler.getAllRuns",
            events: [
                {
                    http: {
                        path: "tests/{id}/runs",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-run-compare": {
            handler: "src/handler.getRunCompare",
            events: [
                {
                    http: {
                        path: "run/{id}/compare",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "accept-run-changes": {
            handler: "src/handler.aceptChanges",
            events: [
                {
                    http: {
                        path: "run/{id}/accept",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-all-user-runs": {
            handler: "src/handler.getAllUserRuns",
            events: [
                {
                    http: {
                        path: "users/run",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "delete-run": {
            handler: "src/handler.deleteRun",
            events: [
                {
                    http: {
                        path: "run/{id}",
                        method: "delete",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "create-appInfo": {
            handler: "src/handler.createAppInfo",
            events: [
                {
                    http: {
                        path: "appInfo",
                        method: "post",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-appInfo": {
            handler: "src/handler.getAppInfo",
            events: [
                {
                    http: {
                        path: "appInfo/{id}",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "delete-appInfo": {
            handler: "src/handler.deleteAppInfo",
            events: [
                {
                    http: {
                        path: "appInfo/{id}",
                        method: "delete",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-all-appInfo": {
            handler: "src/handler.getAllAppInfo",
            events: [
                {
                    http: {
                        path: "appInfos",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "update-appInfo": {
            handler: "src/handler.updateAppInfo",
            events: [
                {
                    http: {
                        path: "appInfo",
                        method: "put",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "create-result": {
            handler: "src/handler.createResult",
            events: [
                {
                    http: {
                        path: "results",
                        method: "post",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-result": {
            handler: "src/handler.getResult",
            events: [
                {
                    http: {
                        path: "results/{id}",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-all-results": {
            handler: "src/handler.getAllResults",
            events: [
                {
                    http: {
                        path: "run/{id}/results",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "create-device": {
            handler: "src/lambdas/deviceInfo.CrudHandlerDevice",
            events: [
                {
                    http: {
                        path: "device",
                        method: "post",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
                {
                    http: {
                        path: "device",
                        method: "put",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-device": {
            handler: "src/handler.getDevice",
            events: [
                { http: { path: "device/{id}", method: "get", cors: true } },
            ],
        },
        "delete-device": {
            handler: "src/handler.deleteDevice",
            events: [
                {
                    http: {
                        path: "device/{id}",
                        method: "delete",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-all-devices": {
            handler: "src/handler.getAllDevices",
            events: [
                {
                    http: {
                        path: "device/all",
                        method: "post",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "create-variable": {
            handler: "src/handler.createVariable",
            events: [
                {
                    http: {
                        path: "variable",
                        method: "post",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-variable": {
            handler: "src/handler.getVariable",
            events: [
                {
                    http: {
                        path: "variable/{id}",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "update-variable": {
            handler: "src/handler.updateVariable",
            events: [
                {
                    http: {
                        path: "variable",
                        method: "put",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-all-global-variable": {
            handler: "src/handler.getAllGlobalVariables",
            events: [
                {
                    http: {
                        path: "variable/all",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "delete-variable": {
            handler: "src/handler.deleteVariable",
            events: [
                {
                    http: {
                        path: "variable/{id}",
                        method: "delete",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "create-run-variable": {
            handler: "src/handler.createRunVariable",
            events: [
                {
                    http: {
                        path: "variable/run",
                        method: "post",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
        "get-run-variable": {
            handler: "src/handler.getRunVariable",
            events: [
                {
                    http: {
                        path: "variable/{id}/run/{runId}",
                        method: "get",
                        cors: true,
                        authorizer: "aws_iam",
                    },
                },
            ],
        },
    },
};
module.exports = serverlessConfiguration;
