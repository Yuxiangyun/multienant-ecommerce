"use client";
import { Poppins } from "next/font/google";
import{
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { loginSchema } from "../../schema"
import Link from "next/link"
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner"
import { useRouter } from "next/navigation";


const poppins = Poppins({
    subsets:["latin"],
    weight:["700"]
})
export const SignInView = () => {
    const router = useRouter()
    const trpc = useTRPC()
    const login = useMutation(trpc.auth.login.mutationOptions({
        onError: (error) => [
            toast.error(error.message)
        ],
        onSuccess:() => {
            router.push("/")
        }
    }))

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        mode:"all",
        defaultValues:{
            email: "",
            password: "",
        }
    })

    const onSubmit = (values:z.infer<typeof loginSchema>) => {
        login.mutate(values)
    }

    return(
        <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="bg-[#f4f4f0] h-screen w-full lg:col-span-3 overflow-y-auto">
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-8 p-4 lg:p-16"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <Link href={"/"}>
                                <span className={cn("text-2xl font-semibold", poppins.className)}>funroad</span>
                            </Link>
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="text-base underline border-none"
                            >
                                <Link prefetch href={"/sign-up"}>
                                    Sing up
                                </Link>
                            </Button>
                        </div>
                        <h1 className="text-4xl font-medium">
                            Welcome back to Funroad.
                        </h1> 
                        <FormField
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-base">Email</FormLabel>
                                    <FormControl>
                                        <Input {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        >
                        </FormField>

                        <FormField
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-base">Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        >
                        </FormField>
                        <Button
                            disabled={login .isPending}
                            className="bg-black text-white hover:bg-pink-400 hover:text-primary"
                            size="lg"
                            type="submit"
                            variant="elevated"
                        >
                           Log in
                        </Button>
                    </form>
                </Form>
            </div>

            <div 
                className="h-screen w-full lg:col-span-2 hidden lg:block"
                style={{
                    backgroundImage: "url('/auth-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            /> 
        </div>
    )
}