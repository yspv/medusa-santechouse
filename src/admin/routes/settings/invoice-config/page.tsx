import { defineRouteConfig } from "@medusajs/admin-sdk"
import {
    Container,
    Heading,
    Button,
    Input,
    Label,
    Textarea,
    toast,
} from "@medusajs/ui"
import { useMutation, useQuery } from "@tanstack/react-query"
import { sdk } from "../../../lib/sdk"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import { FormProvider, Controller } from "react-hook-form"
import { useCallback, useEffect } from "react"

type InvoiceConfig = {
    id: string
    company_name: string
    company_address: string
    company_phone: string
    company_email: string
    company_logo?: string
    notes?: string
}

const schema = zod.object({
    company_name: zod.string().optional(),
    company_address: zod.string().optional(),
    company_phone: zod.string().optional(),
    company_email: zod.string().email().optional(),
    company_logo: zod.string().url().optional().or(zod.literal("")),
    notes: zod.string().optional(),
})

const InvoiceConfigPage = () => {
    const { data, isLoading, refetch } = useQuery<{
        invoice_config: InvoiceConfig
    }>({
        queryFn: () => sdk.client.fetch("/admin/invoice-config"),
        queryKey: ["invoice-config"],
    })

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: zod.infer<typeof schema>) =>
            sdk.client.fetch("/admin/invoice-config", {
                method: "POST",
                body: payload,
            }),
        onSuccess: () => {
            refetch()
            toast.success("Invoice config updated successfully")
        },
        onError: (err) => {
            toast.error(`Failed to update: ${err.message}`)
        },
    })

    const getFormDefaultValues = useCallback(() => {
        return {
            company_name: data?.invoice_config?.company_name || "",
            company_address: data?.invoice_config?.company_address || "",
            company_phone: data?.invoice_config?.company_phone || "",
            company_email: data?.invoice_config?.company_email || "",
            company_logo: data?.invoice_config?.company_logo || "",
            notes: data?.invoice_config?.notes || "",
        }
    }, [data])

    const form = useForm<zod.infer<typeof schema>>({
        defaultValues: getFormDefaultValues(),
    })

    const handleSubmit = form.handleSubmit((formData) => mutateAsync(formData))

    const uploadLogo = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) {
            return
        }

        try {
            const { files } = await sdk.admin.upload.create({ files: [file] })
            form.setValue("company_logo", files[0].url)
            toast.success("Logo uploaded successfully")
        } catch (err) {
            toast.error("Failed to upload logo")
        }
    }

    useEffect(() => {
        form.reset(getFormDefaultValues())
    }, [getFormDefaultValues])

    return (
        <Container className="divide-y p-0">
            <div className="flex items-center justify-between px-6 py-4">
                <Heading level="h1">Invoice Configuration</Heading>
            </div>
            <FormProvider {...form}>
                <form
                    onSubmit={handleSubmit}
                    className="flex h-full flex-col overflow-hidden p-6 gap-4"
                >
                    <Controller
                        control={form.control}
                        name="company_name"
                        render={({ field }) => (
                            <div className="flex flex-col space-y-2">
                                <Label size="small" weight="plus">
                                    Company Name
                                </Label>
                                <Input {...field} placeholder="Acme Inc." />
                            </div>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="company_address"
                        render={({ field }) => (
                            <div className="flex flex-col space-y-2">
                                <Label size="small" weight="plus">
                                    Company Address
                                </Label>
                                <Textarea {...field} placeholder="123 Main St, City, Country" />
                            </div>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="company_phone"
                        render={({ field }) => (
                            <div className="flex flex-col space-y-2">
                                <Label size="small" weight="plus">
                                    Company Phone
                                </Label>
                                <Input {...field} placeholder="+1 234 567 8900" />
                            </div>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="company_email"
                        render={({ field }) => (
                            <div className="flex flex-col space-y-2">
                                <Label size="small" weight="plus">
                                    Company Email
                                </Label>
                                <Input {...field} type="email" placeholder="admin@example.com" />
                            </div>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <div className="flex flex-col space-y-2">
                                <Label size="small" weight="plus">
                                    Notes
                                </Label>
                                <Textarea
                                    {...field}
                                    placeholder="Payment terms, thank you message, etc."
                                />
                            </div>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="company_logo"
                        render={({ field }) => (
                            <div className="flex flex-col space-y-2">
                                <Label size="small" weight="plus">
                                    Company Logo
                                </Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={uploadLogo}
                                    className="py-1"
                                />
                                {field.value && (
                                    <img
                                        src={field.value}
                                        alt="Company Logo"
                                        className="mt-2 h-24 w-24 object-contain rounded border"
                                    />
                                )}
                            </div>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isLoading || isPending}
                        isLoading={isPending}
                        className="self-start"
                    >
                        Save Changes
                    </Button>
                </form>
            </FormProvider>
        </Container>
    )
}

export const config = defineRouteConfig({
    label: "Default Invoice Config",
})

export default InvoiceConfigPage
