import { MedusaService } from "@medusajs/framework/utils"
import { InvoiceConfig } from "./models/invoice-config"
import { Invoice, InvoiceStatus } from "./models/invoice"
import {
    InferTypeOf,
    OrderDTO,
    OrderLineItemDTO,
} from "@medusajs/framework/types"
import axios from "axios"
import path from "path"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const PdfPrinter = require("pdfmake")

const fonts = {
    Inter: {
        normal: path.join(process.cwd(), "src/modules/invoice-generator/fonts/Inter-Regular.ttf"),
        bold: path.join(process.cwd(), "src/modules/invoice-generator/fonts/Inter-Medium.ttf"),
    },
    Helvetica: {
        normal: path.join(process.cwd(), "src/modules/invoice-generator/fonts/Inter-Regular.ttf"),
        bold: path.join(process.cwd(), "src/modules/invoice-generator/fonts/Inter-Medium.ttf"),
    },
    Roboto: {
        normal: path.join(process.cwd(), "src/modules/invoice-generator/fonts/Inter-Regular.ttf"),
        bold: path.join(process.cwd(), "src/modules/invoice-generator/fonts/Inter-Medium.ttf"),
    },
}

const printer = new PdfPrinter(fonts)

type GeneratePdfParams = {
    order: OrderDTO
    items: OrderLineItemDTO[]
}

class InvoiceGeneratorService extends MedusaService({
    InvoiceConfig,
    Invoice,
}) {
    private async formatAmount(amount: number, currency: string): Promise<string> {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
        }).format(amount)
    }

    private async imageUrlToBase64(url: string): Promise<string> {
        const response = await axios.get(url, { responseType: "arraybuffer" })
        const base64 = Buffer.from(response.data).toString("base64")
        const mimeType = response.headers["content-type"] || "image/png"
        return `data:${mimeType};base64,${base64}`
    }

    private async createInvoiceContent(
        params: GeneratePdfParams,
        invoice: InferTypeOf<typeof Invoice>
    ): Promise<Record<string, any>> {
        // Get invoice configuration
        const invoiceConfigs = await this.listInvoiceConfigs()
        const config = invoiceConfigs[0] || {}

        // Create table for order items
        const itemsTable = [
            [
                { text: "Товар", style: "tableHeader" },
                { text: "Бренд", style: "tableHeader" },
                { text: "Кол-во", style: "tableHeader" },
                { text: "Цена за ед.", style: "tableHeader" },
                { text: "Итого", style: "tableHeader" },
            ],
            ...(await Promise.all(
                params.items.map(async (item: any) => [
                    { text: item.title || "Неизвестный товар", style: "tableRow" },
                    { text: item.variant?.product?.brand?.name || "-", style: "tableRow" },
                    { text: item.quantity.toString(), style: "tableRow" },
                    {
                        text: await this.formatAmount(
                            item.unit_price,
                            params.order.currency_code
                        ),
                        style: "tableRow",
                    },
                    {
                        text: await this.formatAmount(
                            Number(item.total),
                            params.order.currency_code
                        ),
                        style: "tableRow",
                    },
                ])
            )),
        ]

        const invoiceId = `INV-${invoice.display_id.toString().padStart(6, "0")}`
        const invoiceDate = new Date(invoice.created_at).toLocaleDateString()

        return {
            pageSize: "A4",
            pageMargins: [40, 40, 40, 60],
            content: [
                // Header (Logo, Company Name, Invoice Title)
                {
                    columns: [
                        // Company Logo + Name
                        {
                            width: "*",
                            stack: [
                                ...(config.company_logo
                                    ? [
                                        {
                                            image: await this.imageUrlToBase64(config.company_logo),
                                            width: 60,
                                            height: 30,
                                            fit: [60, 30],
                                            margin: [0, 0, 0, 10],
                                        },
                                    ]
                                    : []),
                                {
                                    text: config.company_name || "Your Company Name",
                                    style: "companyName",
                                    margin: [0, 0, 0, 2],
                                },
                            ],
                        },
                        // Invoice Title
                        {
                            width: "auto",
                            stack: [
                                { text: "СЧЁТ-ФАКТУРА", style: "invoiceTitle" },
                                { text: invoiceId, style: "invoiceId", margin: [0, 4, 0, 0] },
                            ],
                            alignment: "right",
                        },
                    ],
                    margin: [0, 0, 0, 20],
                },
                // Company & Invoice Info
                {
                    columns: [
                        {
                            width: "*",
                            stack: [
                                { text: config.company_address || "", style: "companyDetail" },
                                { text: config.company_phone || "", style: "companyDetail" },
                                { text: config.company_email || "", style: "companyDetail" },
                            ],
                        },
                        {
                            width: "auto",
                            stack: [
                                { text: `Дата счета: ${invoiceDate}`, style: "invoiceDetail" },
                                {
                                    text: `Заказ №: ${params.order.display_id || params.order.id}`,
                                    style: "invoiceDetail",
                                },
                                {
                                    text: `Дата заказа: ${new Date(
                                        params.order.created_at as unknown as string
                                    ).toLocaleDateString()}`,
                                    style: "invoiceDetail",
                                },
                            ],
                            alignment: "right",
                        },
                    ],
                    margin: [0, 0, 0, 20],
                },
                // Billing & Shipping Addresses
                {
                    columns: [
                        {
                            width: "*",
                            stack: [
                                { text: "Доставить:", style: "sectionHeader" },
                                ...(params.order.shipping_address
                                    ? [
                                        {
                                            text: [
                                                params.order.shipping_address.first_name || "",
                                                " ",
                                                params.order.shipping_address.last_name || "",
                                            ],
                                            style: "addressText"
                                        },
                                        {
                                            text: params.order.shipping_address.address_1 || "",
                                            style: "addressText"
                                        },
                                        {
                                            text: [
                                                params.order.shipping_address.city || "",
                                                ", ",
                                                params.order.shipping_address.country_code || "",
                                            ],
                                            style: "addressText"
                                        }
                                    ]
                                    : [])
                            ]
                        }
                    ],
                    margin: [0, 0, 0, 20]
                },
                // Items Table
                {
                    table: {
                        headerRows: 1,
                        widths: ["*", "auto", "auto", "auto", "auto"],
                        body: itemsTable,
                    },
                    layout: {
                        hLineWidth: (i: number, node: any) =>
                            i === 0 || i === 1 || i === node.table.body.length ? 0.5 : 0,
                        vLineWidth: () => 0,
                        hLineColor: () => "#E4E4E7",
                        paddingTop: () => 8,
                        paddingBottom: () => 8,
                    },
                    margin: [0, 20, 0, 20],
                },
                // Totals
                {
                    columns: [
                        { width: "*", text: "" },
                        {
                            width: "auto",
                            table: {
                                body: [
                                    [
                                        { text: "Подитог", style: "totalsLabel" },
                                        {
                                            text: await this.formatAmount(
                                                Number(params.order.subtotal || 0),
                                                params.order.currency_code
                                            ),
                                            style: "totalsValue",
                                        },
                                    ],
                                    [
                                        { text: "Доставка", style: "totalsLabel" },
                                        {
                                            text: await this.formatAmount(
                                                Number(
                                                    (params.order.shipping_methods || []).reduce(
                                                        (acc: number, m: any) => acc + Number(m.total || 0),
                                                        0
                                                    )
                                                ),
                                                params.order.currency_code
                                            ),
                                            style: "totalsValue",
                                        },
                                    ],
                                    ...(params.order.discount_total && Number(params.order.discount_total) > 0 ? [
                                        [
                                            { text: "Скидка", style: "totalsLabel" },
                                            {
                                                text: `-${await this.formatAmount(
                                                    Number(params.order.discount_total || 0),
                                                    params.order.currency_code
                                                )}`,
                                                style: "totalsValue",
                                            },
                                        ]
                                    ] : []),
                                    [
                                        {
                                            canvas: [
                                                { type: "line", x1: 0, y1: 5, x2: 180, y2: 5, lineWidth: 0.5, lineColor: "#E4E4E7" }
                                            ],
                                            colSpan: 2,
                                            margin: [0, 10, 0, 10],
                                        },
                                        {}
                                    ],
                                    [
                                        { text: "ИТОГО", style: "totalLabel" },
                                        {
                                            text: await this.formatAmount(
                                                Number(params.order.total || 0),
                                                params.order.currency_code
                                            ),
                                            style: "totalValue",
                                        },
                                    ],
                                ],
                            },
                            layout: "noBorders",
                        },
                    ],
                },
                // Notes
                ...(config.notes
                    ? [
                        { text: "Примечания", style: "sectionHeader", margin: [0, 20, 0, 5] },
                        { text: config.notes, style: "notesText" },
                    ]
                    : []),
            ],
            styles: {
                companyName: { fontSize: 13, bold: true, color: "#18181B" },
                companyDetail: { fontSize: 9, color: "#71717A", lineHeight: 1.4 },
                invoiceTitle: { fontSize: 20, bold: true, color: "#18181B", letterSpacing: 1 },
                invoiceId: { fontSize: 10, color: "#71717A" },
                invoiceDetail: { fontSize: 9, color: "#71717A", lineHeight: 1.4 },
                sectionHeader: { fontSize: 10, bold: true, color: "#18181B", margin: [0, 0, 0, 6] },
                addressText: { fontSize: 9, color: "#3F3F46", lineHeight: 1.4 },
                tableHeader: {
                    bold: true,
                    fontSize: 9,
                    color: "#18181B",
                    margin: [0, 4, 0, 4],
                },
                tableRow: { fontSize: 9, color: "#3F3F46", margin: [0, 4, 0, 4] },
                totalsLabel: { fontSize: 9, color: "#71717A", margin: [0, 4, 20, 4] },
                totalsValue: { fontSize: 9, color: "#18181B", alignment: "right", margin: [0, 4, 0, 4] },
                totalLabel: { fontSize: 11, bold: true, color: "#18181B", margin: [0, 8, 20, 0] },
                totalValue: { fontSize: 11, bold: true, color: "#18181B", alignment: "right", margin: [0, 8, 0, 0] },
                notesText: { fontSize: 9, color: "#71717A", lineHeight: 1.5 },
            },
            defaultStyle: { font: "Inter" },
        }
    }

    async generatePdf(
        params: GeneratePdfParams & { invoice_id: string }
    ): Promise<Buffer> {
        const invoice = await this.retrieveInvoice(params.invoice_id)

        // Generate new content if not already stored
        const pdfContent =
            Object.keys(invoice.pdfContent).length
                ? invoice.pdfContent
                : await this.createInvoiceContent(params, invoice)

        await this.updateInvoices({
            id: invoice.id,
            pdfContent,
        })

        // Return PDF as a Buffer
        return new Promise((resolve, reject) => {
            const chunks: Buffer[] = []

            const pdfDoc = printer.createPdfKitDocument(pdfContent as any)

            pdfDoc.on("data", (chunk) => chunks.push(chunk))
            pdfDoc.on("end", () => {
                const result = Buffer.concat(chunks)
                resolve(result)
            })
            pdfDoc.on("error", (err) => reject(err))

            pdfDoc.end()
        })
    }
}

export default InvoiceGeneratorService
