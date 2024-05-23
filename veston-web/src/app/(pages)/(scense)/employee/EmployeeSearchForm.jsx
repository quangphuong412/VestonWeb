'use client';
import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { searchEmployee } from '@/app/apis/employee/employee';
import {
  getListRequest,
  getListRequestSuccess,
  getListRequestError,
  putDataToUpdateRefesh,
  refreshEmployee,
} from '@/app/redux/slice/scense/employee';
import { useToast } from '@/components/ui/use-toast';

export default function EmployeeSearchForm() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      // area_id_otp: '',
      // area_nm_otp: '',
      // employee_id_otp: '',
      // employee_nm_otp: '',
      // email_otp: '',
      // phone_otp: '',
      // address_otp: '',
      del_yn_otp: 'N',
    },
  });
  const isLoading = useSelector((state) => state.auth.isLoading);

  const handleSearchRequest = async (paramsSearch) => {
    try {
      const { status, message, data } = await searchEmployee(paramsSearch);
      if (status == 1) {
        toast({
          variant: 'success',
          title: 'Searching Successfully!',
          description: message,
        });
        dispatch(getListRequestSuccess(data.rows));
      } else {
        toast({
          variant: 'destructive',
          title: 'Searching failed!',
          description: message,
        });
        dispatch(getListRequestError(false));
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Searching failed!',
        description: e ?? 'Có lỗi xảy ra!',
      });
      dispatch(getListRequestError(false));
    }
  };

  const onSubmit = (e) => {
    dispatch(getListRequest(true));
    handleSearchRequest(e);
  };

  useEffect(() => {
    // form.handleSubmit();
  }, []);

  return (
    <Card>
      <Form {...form}>
        <form disable={isLoading} onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader></CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 grid-flow-row gap-4">
              <FormField
                className="grid items-center gap-1.5"
                control={form.control}
                name="branch_id_otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch ID</FormLabel>
                    <FormControl>
                      <Input {...field} {...form.register('branch_id_otp')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className="grid items-center gap-1.5"
                control={form.control}
                name="employee_id_otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee ID</FormLabel>
                    <FormControl>
                      <Input {...field} {...form.register('employee_id_otp')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className="grid items-center gap-1.5"
                control={form.control}
                name="employee_name_otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('employee_name_otp')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className="grid items-center gap-1.5"
                control={form.control}
                name="del_yn_otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delete</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue="N"
                        {...form.register('del_yn_otp')}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Y">Yes</SelectItem>
                            <SelectItem value="N">No</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <div className="flex space-x-4 p-4 rounded-lg">
              <Button type="submit" className="w-full">
                Search
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
