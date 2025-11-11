
import { SignUpView } from "@/modules/auth/ui/view/sing-up-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await caller.auth.session();
    if(session.user){
        redirect("/")
    }
    return <SignUpView/>
}
 
export default Page;