import { useEffect, useMemo, useState } from "react"
import { Button } from "./ui/button"
import { Field, FieldGroup, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import type { Languages } from "@/types"
import translation from "@/translation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group"
import { Mail } from "lucide-react"

const fileTypes = ["auto", "video", "audio", "document", "archive"]
const videoFormats = ["4k", "2k", "1080", "720", "480"]
const audioFormats = ["high", "premium", "standart", "basic"]
const documentFormats = ["pdf", "docx", "xlsx", "pptx", "txt"]
const archiveFormats = ["zip", "rar", "7z", "tar.gz"]

const getFormats = (selectedType: string): string[] => {
  switch (selectedType) {
    case "video":
      return videoFormats
    case "audio":
      return audioFormats
    case "document":
      return documentFormats
    case "archive":
      return archiveFormats
    default:
      return []
  }
}

function AuthenticationDialog({
  language,
  open,
  setOpen,
}: {
  language: Languages
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setError("")
  }, [language])

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    setError("")

    if (!email.trim()) {
      setError(translation.emailError[language])
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setError(translation.authError[language])
    }, 800)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) setError("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{translation.authTitle[language]}</DialogTitle>
          <DialogDescription>
            {translation.authDescription[language]}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="w-full">
          <FieldGroup>
            <Field>
              <InputGroup>
                <InputGroupInput
                  type="email"
                  placeholder={translation.emailPlaceholder[language]}
                  value={email}
                  onChange={handleEmailChange}
                  className={error ? "border-red-500 focus:border-red-500" : ""}
                />
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
              </InputGroup>
              {error && (
                <p className="mt-1 mb-0 pb-0 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}
            </Field>
            <Field>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading
                  ? translation.check[language]
                  : translation.authButton[language]}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function FileForm({ language }: { language: Languages }) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")
  const [selectedType, setSelectedType] = useState<string>("auto")
  const [selectedFormat, setSelectedFormat] = useState<string>("")
  const formats = useMemo(() => getFormats(selectedType), [selectedType])

  useEffect(() => {
    setError("")
  }, [language])

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    if (error) setError("")
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)

    const newFormats = getFormats(type)
    setSelectedFormat(newFormats[0] ?? "")
  }

  return (
    <>
      <form
        className="border border-primary bg-secondary p-2"
        onSubmit={(e) => {
          e.preventDefault()
          const trimmedUrl = url.trim()
          if (!trimmedUrl) {
            setError(translation.emptyUrlError[language])
            return
          }
          if (!trimmedUrl.startsWith("https://")) {
            setError(translation.urlTemplateError[language])
            return
          }
          if (trimmedUrl.length <= 8) {
            setError(translation.incorrectUrlError[language])
            return
          }
          setError("")
          setOpen(true)
        }}
      >
        <FieldGroup>
          <Field>
            <FieldLabel>{translation.chooseType[language]}</FieldLabel>
            <div className="flex gap-4">
              {fileTypes.map((type) => (
                <Button
                  key={type}
                  variant={type === selectedType ? "default" : "outline"}
                  onClick={() => handleTypeChange(type)}
                  className="flex-1"
                >
                  {
                    translation.formats[
                      type as keyof typeof translation.formats
                    ][language]
                  }
                </Button>
              ))}
            </div>
          </Field>
          <Field>
            <FieldLabel>{translation.enterUrl[language]}</FieldLabel>
            <div className="flex gap-2">
              <Input
                placeholder="https://"
                value={url}
                onChange={handleUrlChange}
              />
              <Button type="submit">{translation.load[language]}</Button>
            </div>
            {error && (
              <p className="mt-1 mb-0 pb-0 text-sm font-medium text-red-600">
                {error}
              </p>
            )}
          </Field>
          {selectedType === "auto" ? (
            <div className="border bg-primary p-2 text-primary-foreground">
              <p>{translation.autoDescription[language]}</p>
            </div>
          ) : (
            <Select
              value={selectedFormat}
              itemToStringLabel={(format) =>
                translation.formats[format as keyof typeof translation.formats][
                  language
                ]
              }
              onValueChange={setSelectedFormat}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                {formats.map((format) => (
                  <SelectItem key={format} value={format}>
                    {
                      translation.formats[
                        format as keyof typeof translation.formats
                      ][language]
                    }
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FieldGroup>
      </form>
      <AuthenticationDialog language={language} open={open} setOpen={setOpen} />
    </>
  )
}

export default FileForm
