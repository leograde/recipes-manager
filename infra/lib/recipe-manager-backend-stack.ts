import { Construct, Duration, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';
import { Code, Function as LambdaFunction, Runtime } from '@aws-cdk/aws-lambda';
import { Cors, LambdaRestApi } from '@aws-cdk/aws-apigateway';
import { InstanceClass, InstanceSize, InstanceType, SubnetType, Vpc } from '@aws-cdk/aws-ec2';
import {
  Credentials,
  DatabaseInstance,
  DatabaseInstanceEngine,
  PostgresEngineVersion,
} from '@aws-cdk/aws-rds';
import { RetentionDays } from '@aws-cdk/aws-logs';
import { join } from 'path';

import { getEnvironment } from '../utils';

export class RecipeManagerBackendStack extends Stack {
  public constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const environment = getEnvironment(this);

    const vpc = new Vpc(this, `${id}-vpc`, {
      cidr: '10.0.0.0/16',
      maxAzs: 2,
      natGateways: 0,
      subnetConfiguration: [
        {
          name: 'Ingress',
          cidrMask: 24,
          subnetType: SubnetType.ISOLATED,
        },
      ],
    });

    const database = new DatabaseInstance(this, `${id}-database`, {
      vpc,
      vpcSubnets: { subnetType: SubnetType.ISOLATED },
      databaseName: `recipe_manager_backend_database`,
      credentials: Credentials.fromGeneratedSecret('recipe_manager_admin'),
      port: 5432,
      engine: DatabaseInstanceEngine.postgres({ version: PostgresEngineVersion.VER_13 }),
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
      allocatedStorage: 20,
      multiAz: false,
      backupRetention: Duration.days(0),
      removalPolicy: RemovalPolicy.DESTROY,
      cloudwatchLogsRetention: RetentionDays.ONE_DAY,
    });

    const recipeManagerLambdaFunction = new LambdaFunction(this, `${id}-lambda-function`, {
      vpc,
      vpcSubnets: { subnetType: SubnetType.ISOLATED },
      code: Code.fromAsset(join(__dirname, '../../dist')),
      functionName: `${id}-lambda-function`,
      handler: 'main.handler',
      memorySize: 128,
      runtime: Runtime.NODEJS_14_X,
      environment: {
        NODE_ENV: environment,
        DB_NAME: `${id}-database`,
        DB_HOST: database.dbInstanceEndpointAddress,
        DB_PORT: database.dbInstanceEndpointPort,
        DB_USERNAME: database.secret?.secretValueFromJson('username').toString() ?? '',
        DB_PASSWORD: database.secret?.secretValueFromJson('password').toString() ?? '',
      },
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
