'use client';

import React, { useState, useEffect, useRef } from 'react';

import Image from 'next/image'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { refreshFormEmp } from '@/app/redux/slice/scense/employee';

import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { Button } from '@/components/ui/button';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useToast } from '@/components/ui/use-toast';

import { insertEmployee } from '@/app/apis/employee/employee';
import { searchBranch } from '@/app/apis/branch/branch';
import { insertAccount } from '@/app/apis/account/account';

export default function EmployeeAddForm(data) {
  const options = useSelector((state) => state.employee.optionSelect);
  const flagGet = useSelector((state) => state.employee.flags);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const users = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [branchArea, setbranchArea] = useState([]);

    const [flagAcc, setflagAcc] = useState(true);

    const statusHide = flagGet === 0 ? 'w-4/12' : 'w-4/12 hidden';

    var form = useForm( 
        {
            defaultValues: {
                area_id:"",
                branch_id:"",
                employee_nm: "",
                position: "",
                usrname:"",
                email:"",
                gender:"",
                salary:"",
                address:"",
                phone:"",

        }
    });
    
    const handleSelectChange = async (e) => {
        const areaId = {"area_id_otp" : e}
        console.log(areaId);
        try {
            const { message, status, data } = await searchBranch(areaId);
            setbranchArea(data.rows);
          } catch (e) {
            toast({
              variant: 'destructive',
              title: 'Select failed!',
              description: e ?? 'Có lỗi xảy ra!',
            });
          }
    }

    const onSubmit = async (e) => {
        e.cre_usr_id = users.usrname;
        console.log(e.birthday);
        try {
            const insEmp = await insertEmployee(e);
            e =  {...e, 'employee_id': insEmp.data.rows.employee_id}
            const insAcc = await insertAccount(e);
            if ((insEmp.status || insAcc.status) == 1) {
                toast({
                    variant: 'success',
                    title: 'Add Employee Successfully!',
                    description: insEmp.message,
                });
                dispatch(refreshFormEmp());
                form.reset();
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Add Employee failed!',
                    description: insEmp.message,
                });
            }
        } catch (e) {
            toast({
                variant: 'destructive',
                title: 'Select failed!',
                description: e ?? 'Có lỗi xảy ra!',
            });
        }
      };

    const handleCloseForm = async () => {
    dispatch(refreshFormEmp());
    form.reset();
    };

    const handleAcc = async () => {
        setflagAcc(false);
    };

    // const handleOchan = async (e) => {
    //     const eAcc = {'email': e.target.value}
    //     try {
    //         const { data } = await searchAccount(eAcc);
    //         setUsername(data.rows[0].usrname);
    //     } catch (e) {
            
    //     }
    // };

  useEffect(() => {
    dispatch(refreshFormEmp());
    form.reset();
      }, [form.reset]);

  return (
    <div className={statusHide}>
      <Card>
        <Form {...form}>
          <div className="m-3 float-right">
            <Button
              onClick={() => handleCloseForm()}
              variant="outline"
              size="icon"
            >
              <Cross1Icon className="h-4 w-4" />
            </Button>
          </div>
          <form disable={isLoading} onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className=""></CardHeader>
            {/* <CardContent className="p-6 text-sm">
            <ImageProfile />
            </CardContent> */}
            <CardContent>
              <FormField
                className=""
                control={form.control}
                name="area_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area</FormLabel>
                    <FormControl>   
                    <FormControl>
                        <Select
                        {...field}
                        {...form.register('area_id', {
                            required: "select one area option"
                          })}
                        onValueChange={(e) => {
                            field.onChange(e);
                            handleSelectChange(e);
                          }}
                        >
                        <SelectTrigger>
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                              {/* Map over the options array to create option elements */}
                              {options.map((option) => (
                                <SelectItem value={option.area_id}>
                                  {option.area_nm}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="branch_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch</FormLabel>
                    <FormControl>
                      <FormControl>
                        <Select
                        {...field}
                        {...form.register('branch_id', {
                            required: "select one branch option"
                          })}
                        onValueChange={field.onChange}
                        required
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {/* Map over the options array to create option elements */}
                              {branchArea.map((option) => (
                                <SelectItem value={option.branch_id}>
                                  {option.branch_nm}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="employee_nm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('employee_nm')}
                        required
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="position"
                render={({ field }) => (
                <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                <FormControl>
                    <Select
                    {...field}
                    {...form.register('position', {
                        required: "select one position option"
                      })}
                    onValueChange={field.onChange}
                    required
                    >
                    <SelectTrigger>
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="RECEPTIONIST">RECEPTIONIST</SelectItem>
                        <SelectItem value="SEWINGSTAFF">SEWINGSTAFF</SelectItem>
                        <SelectItem value="STOREMANAGER">STOREMANAGER</SelectItem>
                        <SelectItem value="SHIPPER">SHIPPER</SelectItem>
                        <SelectItem value="SECURITYGUARD">SECURITYGUARD</SelectItem>
                        <SelectItem value="BRANCHMANAGER">BRANCHMANAGER</SelectItem>
                        <SelectItem value="GENERALMANAGER">GENERALMANAGER</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </FormControl>
                </FormControl>
                <FormMessage />
                </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="gender"
                render={({ field }) => (
                <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                <FormControl>
                    <Select
                    {...field}
                    {...form.register('gender', {
                        required: "select one gender option"
                      })}
                    onValueChange={field.onChange}
                    required
                    >
                    <SelectTrigger>
                        <SelectValue placeholder = "Select gender"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="MALE">MALE</SelectItem>
                        <SelectItem value="FEMALE">FEMALE</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </FormControl>
                </FormControl>
                <FormMessage />
                </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="0"
                        {...form.register('salary')}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('email')}
                        placeholder="Example@123.com"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        // onChange={handleOchan}
                        required
                        ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="birthday"
                render={({ field }) => {
                  if (!field.value) {
                    field.onChange(new Date()); // Set field value to current date if it's undefined
                  }
                  return (
                    <FormItem>
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, 'PPP')
                              : format(new Date(), 'PPP')}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={field.value}
                            onSelect={field.onChange}
                            required
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            fromYear={1960}
                            toYear={new Date().getFullYear()}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  );
                }}
              />
              <FormField
                className=""
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} {...form.register('address')}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('phone')}
                        type="number"
                        maxlength="10"
                        min="9"
                        valueAsNumber="true"
                        ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <FormField
                className=""
                control={form.control}
                name="img_employee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee Image</FormLabel>
                    <FormControl>
                        <Image
                        {...field}
                        src='/images/background.png'
                        alt='image'
                        width={500}
                        height={500}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator className="mb-2 mt-8" />
              <FormField
                className=""
                control={form.control}
                name="usrname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('usrname')}
                        disabled = {flagAcc}
                        required
                        ></Input>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                className=""
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input
                        {...field}
                        {...form.register('password')}
                        type="password"
                        defaultValue=''
                        disabled = {flagAcc}
                        required
                        ></Input>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                className=""
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                        <Input
                        {...field}
                        {...form.register('confirmPassword', {
                            validate: value =>
                              value === form.watch('password') || "Passwords do not match"
                          })}
                        type="password"
                        defaultValue=''
                        disabled = {flagAcc}
                        required
                        ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardContent className="flex justify-end">
                <div className="flex space-x-4 p-4 rounded-lg">
                <Button type="button"  onClick = {handleAcc} >Add Account</Button>
                <Button type="submit">Save</Button>
              </div>
            </CardContent>
          </form>
        </Form>
      </Card>

      {/* <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
        <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
                <div className="font-medium">Trương Đình Ánh</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                (ID: HCM01E0001)
                </div>
            </CardTitle>
            <CardDescription>Created By: POSTMAN</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
            <ImageProfile />
            </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
            Updated <time dateTime="2023-11-23">November 23, 2023</time>
            </div>
        </CardFooter>
        </Card> */}
    </div>
    );
}
