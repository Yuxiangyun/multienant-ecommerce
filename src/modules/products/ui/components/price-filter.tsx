
import { ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Props{
    minPrice?: string | null,
    maxPrice?: string | null,
    onMinPriceChange: (value:string) => void,
    onMaxPriceChange: (value:string) => void, 
}

export const formatAsCurrency = (value: string) => {
  // 1. 移除所有非数字和小数点的字符
  const numericValue = value.replace(/[^0-9.]/g, "");

  // 2. 用小数点分割整数部分和小数部分
  const parts = numericValue.split(".");

  // 3. 保留格式：整数部分 + 最多 2 位小数
  const formattedValue =
    parts[0] + (parts.length > 1 ? "." + parts[1]?.slice(0, 2) : "");

  // 4. 如果没有可格式化的数字，返回空
  if (!formattedValue) return "";

  // 5. 转成数字（string → number）
  const numberValue = parseFloat(formattedValue);

  // 6. 如果转换后不是数字（NaN），返回空
  if (isNaN(numberValue)) return "";

  // 7. 使用 Intl.NumberFormat 格式化为货币
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0, // 保留 0 到 2 位小数
    maximumFractionDigits: 2,
  }).format(numberValue);
};


export const PriceFilter = ({
    minPrice,
    maxPrice,
    onMinPriceChange,
    onMaxPriceChange
}: Props) => {

        const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
            const numericValue = e.target.value.replace(/[^0-9.]/g, "");
            onMinPriceChange(numericValue);
            };
 
        const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
            const numericValue = e.target.value.replace(/[^0-9.]/g, "");
            onMaxPriceChange(numericValue);
            };

        return(
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <Label className="text-base font-medium">
                        Minimum price
                    </Label>
                    <Input
                        type="text"
                        placeholder="$0"
                        value={minPrice? formatAsCurrency(minPrice) : ""}
                        onChange={handleMinPriceChange}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label className="text-base font-medium">
                        Maximum price
                    </Label>
                    <Input
                        type="text" 
                        placeholder="∞"
                        value={maxPrice? formatAsCurrency(maxPrice) : ""}
                        onChange={handleMaxPriceChange}
                    />
                </div>
            </div>
        )
    }

