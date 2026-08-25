/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form } from "@/components/ui/form";
import { ReactNode } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
  schema?: any;
};

type TFormProps = {
  onSubmit: SubmitHandler<any>;
  children: ReactNode;
} & TFormConfig;

const NRForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
  schema,
}: TFormProps) => {
  const formConfig: any = {};

  if (defaultValues) formConfig.defaultValues = defaultValues;
  if (schema) formConfig.resolver = zodResolver(schema);
  else if (resolver) formConfig.resolver = resolver;

  const methods = useForm(formConfig);

  const submit: SubmitHandler<any> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(submit)} className="space-y-4">
          {children}
        </form>
      </Form>
    </FormProvider>
  );
};

export default NRForm;
