"use client";
import { addDays, format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Category } from "@/Types/Category";
import { createTransaction } from "@/app/dashboard/transactions/new/actions";

export const transactionFormSchema = z.object({
  transactionType: z.enum(["income", "expense"]),
  categoryID: z.coerce.number().positive("Please select a category"), // string value is converted to number and then validated
  transactionDate: z.coerce
    .date()
    .max(addDays(new Date(), 1), "Transaction date cannot be in future"),
  amount: z.coerce.number().positive("Amount Must be greater than 0"),
  description: z
    .string()
    .min(3, "Description must contain at least 3 characters")
    .max(300, "Description must contain a maximum of 300 characters"),
});

type Props = {
  categories: Category[];
  onSubmit: (data: z.infer<typeof transactionFormSchema>) => Promise<void>;
  defaultValues?: {
    transactionType: "income" | "expense";
    amount: number;
    categoryId: number;
    description: string;
    transactionDate: Date;
  };
};

export default function TransactionForm({
  categories,
  onSubmit,
  defaultValues,
}: Props) {
  const form = useForm<
    z.input<typeof transactionFormSchema>,
    any,
    z.infer<typeof transactionFormSchema>
  >({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: 0,
      categoryID: 0,
      description: "",
      transactionDate: new Date(),
      transactionType: "income",
      ...defaultValues,
    },
  });
  const transactionType = form.watch("transactionType");
  const filteredCategories = categories.filter(
    (category) => category.type === transactionType,
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset
          disabled={form.formState.isSubmitting}
          className="grid grid-cols-2 gap-y-5 gap-x-2"
        >
          {/* TRANSACTION TYPE SELECTOR */}
          <FormField
            control={form.control}
            name="transactionType"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(newValue) => {
                        field.onChange(newValue);
                        form.setValue("categoryID", 0);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          {/* CATEGORY SELECTOR */}
          <FormField
            control={form.control}
            name="categoryID"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCategories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          {/* CALENDAR PICKER WITH POPPER */}
          <FormField
            control={form.control}
            name="transactionDate"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Transaction Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          data-empty={!field.value}
                          className=" justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                        >
                          <CalendarIcon />
                          {field.value ? (
                            format(field.value as Date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-70 p-0">
                        <Calendar
                          mode="single"
                          selected={field.value as Date | undefined}
                          onSelect={field.onChange}
                          className="w-full"
                          disabled={{ after: new Date() }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          {/* AMOUNT INPUT */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={field.value as number}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
        </fieldset>
        <fieldset
          disabled={form.formState.isSubmitting}
          className="mt-4 flex flex-col gap-5"
        >
          {/* DESCRIPTION INPUT */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} type="string" value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <Button type="submit">Submit</Button>
        </fieldset>
      </form>
    </Form>
  );
}
