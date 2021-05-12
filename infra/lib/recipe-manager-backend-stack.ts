import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Code, Function as LambdaFunction, Runtime } from '@aws-cdk/aws-lambda';
import { Cors, LambdaRestApi } from '@aws-cdk/aws-apigateway';
import { join } from 'path';

export class RecipeManagerBackendStack extends Stack {
  public constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const recipeManagerLambdaFunction = new LambdaFunction(this, `${id}-lambda-function`, {
      code: Code.fromAsset(join(__dirname, '../../dist')),
      functionName: `${id}-lambda-function`,
      handler: 'main.handler',
      memorySize: 128,
      runtime: Runtime.NODEJS_14_X,
    });

    new LambdaRestApi(this, `${id}-lambda-rest-api`, {
      restApiName: `${id}-lambda-rest-api`,
      handler: recipeManagerLambdaFunction,
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
      },
    });
  }
}
