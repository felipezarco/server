import { Schema, SchemaDefinition, SchemaOptions } from "npm:mongoose";

export const required = (message: string) => [true, message] as const;

export interface CustomSchemaOptions {
  docExpiresIn?: string;
}

export default abstract class BaseSchema {
  schema: Schema;
  constructor(
    schema: SchemaDefinition,
    options: CustomSchemaOptions & SchemaOptions,
  ) {
    const schemaOptions: SchemaOptions = {
      timestamps: true,
    };

    Object.assign(schemaOptions, options);

    if (options.docExpiresIn) {
      Object.assign(schema, {
        createdAt: {
          type: Date,
          default: Date.now,
          expires: options.docExpiresIn,
        },
      });
    }

    this.schema = new Schema(
      schema,
      schemaOptions,
    );
  }
}
