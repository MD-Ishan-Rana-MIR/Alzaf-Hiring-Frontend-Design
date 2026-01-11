import Image from "next/image";
import Link from "next/link";
import MaxWidth from "../max-width/MaxWidth";
import { fetchAllCategory } from "@/app/api/api";
import { AllCategoryType } from "@/app/utility/type/categoryType";

const Header = async () => {
    const categoryData: AllCategoryType[] = await fetchAllCategory();

    return (
        <header className="bg-black shadow-md py-2.5 ">
            <MaxWidth>
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/image/logo.png"
                            width={140}
                            height={40}
                            alt="Alzaf Logo"
                            priority
                        />
                    </Link>

                    {/* Category Navigation */}
                    <nav>
                        <ul className="flex items-center gap-6">
                            {categoryData?.map((cat) => (
                                <li key={cat.id}>
                                    <Link
                                        href={`/category/${cat.slug}`}
                                        className="text-white text-sm font-medium hover:text-orange-400 transition"
                                    >
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                </div>
            </MaxWidth>
        </header>
    );
};

export default Header;
