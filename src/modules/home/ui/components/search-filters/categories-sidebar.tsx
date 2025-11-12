
import{
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { CategoriesGetManyOutput } from "@/modules/categories/type";


interface Props{
    open: boolean;
    onOpenChange: (open:boolean) => void;
}

export const CategoriesSidebar = ({
    open,
    onOpenChange,
}:Props) => {
    const trpc = useTRPC();
    const {data} = useQuery(trpc.categories.getMany.queryOptions())

    const router = useRouter()
    const[parentCategories,setParentCategories] = useState<CategoriesGetManyOutput | null> (null)
    const[selectedCategories,setSelectedCategories] = useState<CategoriesGetManyOutput[1] | null> (null)
    // if we have parent categories,show those, otherwise show root categories
    const currentCategories = parentCategories ?? data ?? []
    const handleOpenChange = (open:boolean) => {
        setSelectedCategories(null)
        setParentCategories(null)
        onOpenChange(open)
    }

    
    const handleCategoryClick = (category:CategoriesGetManyOutput[1]) => {
        if(category.subcategories && category.subcategories.length>0){
            setParentCategories(category.subcategories as CategoriesGetManyOutput)
            setSelectedCategories(category)
        }else{
            // this is leaf category(no subcategory)
            if(parentCategories && selectedCategories){
                //this is subcategory (navigate to /category/subcategory)
                router.push(`/${selectedCategories.slug}/${category.slug}`)
            }else{
                //this is a main category (naviagte to Category)
                if(category.slug === "all"){
                    router.push("/")
                }else{
                    router.push(`/${category.slug}`)
                }
            }
            handleOpenChange(false)
        }
    }
    const backgroundColor = selectedCategories?.color || "white"
    const handleBackClick = () => {
        if(parentCategories) {
            setParentCategories(null)
            setSelectedCategories(null)
        }
    }
    return(
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent
                side="left"
                className="p-0 transition-none"
                style={{backgroundColor}}
            >
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>
                        Categories
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {parentCategories && (
                        <button
                            onClick={handleBackClick}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
                        >
                        <ChevronLeftIcon className="size-4 mr-2"/>
                        Back
                        </button>
                    )}
                    {currentCategories.map((category)=> (
                        <button 
                            onClick={() => handleCategoryClick(category)} 
                            key={category.slug}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer" 
                        >
                            {category.name}
                            {category.subcategories && category.subcategories.length > 0 && <ChevronRightIcon className="size-4"/>}
                        </button>
                    )) }
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}