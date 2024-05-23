'use client';
import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

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

import { searchBranch } from '@/app/apis/branch/branch';
import {
  getListRequest,
  getListRequestSuccess,
  getListRequestError,
  refreshBranch,
} from '@/app/redux/slice/scense/branch';
import { useToast } from '@/components/ui/use-toast';

export default function BranchSearchForm() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      area_id_otp: '',
      area_nm_otp: '',
      branch_id_otp: '',
      branch_nm_otp: '',
      email_otp: '',
      phone_otp: '',
      address_otp: '',
      del_yn_otp: '',
    },
  });

  const isLoading = useSelector((state) => state.auth.isLoading);

  const handleSearchRequest = async (paramsSearch) => {
    try {
      const { status, message, data } = await searchBranch(paramsSearch);
      if (status == 1) {
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
    dispatch(refreshBranch());
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
                name="area_id_otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area ID</FormLabel>
                    <FormControl>
                      <Input {...field} {...form.register('area_id_otp')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="email_otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} {...form.register('email_otp')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className="grid items-center gap-1.5"
                control={form.control}
                name="phone_otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} {...form.register('phone_otp')} />
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
