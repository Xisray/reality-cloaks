import type { Languages } from "@/types"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import ReactCountryFlag from "react-country-flag"

type Props = {
  language: Languages
  onChange: (language: Languages) => void
}

const languages: Record<Languages, string> = {
  ru: "Русский",
  gb: "English",
}

function LanguageSelect({ language, onChange }: Props) {
  return (
    <Select
      value={language}
      onValueChange={(value) => onChange(value as Languages)}
    >
      <SelectTrigger>
        <SelectValue>
          <ReactCountryFlag countryCode={language.toUpperCase()} />
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(languages).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              <ReactCountryFlag
                countryCode={key.toUpperCase()}
                className="my-auto"
              />{" "}
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LanguageSelect
