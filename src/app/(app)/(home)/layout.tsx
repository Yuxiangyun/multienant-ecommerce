import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { SearchFilters } from "./search-filters";
import { Category } from '@/payload-types';
import { CustomCategory } from './type';

interface Props {
    children: React.ReactNode;
}

const Layout = async ({children} : Props) => {

    const payload = await getPayload({
        config: configPromise
    })

    const data = await payload.find({
        collection: "categories",
        pagination: false,
        depth: 1,
        where: {
            parent: {
                exists: false,
            }
        },
        sort:"name"
    })

    const formattedData: CustomCategory[] = data.docs.map((doc) => ({
        ...doc,
        subcategories:(doc.subcategories?.docs ?? [].map((doc) => ({
            ...(doc as Category),
            subcategories: undefined
        })))
    }))as CustomCategory[];
    
    return (
    <>
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <SearchFilters data={formattedData}/>
            <div className="flex-1 bg-[#f4f4f0]">{children}</div>
            <div><Footer /></div>
        </div>

    </>

     );
}
 
export default Layout;