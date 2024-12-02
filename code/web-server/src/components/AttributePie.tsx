import { PdfTextLine } from "@prisma/client"
import { PieChart } from "react-minimal-pie-chart"

interface AttributePieProps {
    comments: PdfTextLine[]
}

const AttributePie = ({ comments }: AttributePieProps) => {
    const totals = comments.reduce((totals, currentComment) => {
        if (currentComment.attribute) {
            totals[currentComment.attribute].value += 1
        }
        return totals
    }, {
        "KNOWLEDGEABLE": { title: "Knowledgeable", value: 0, color: "#FF5733" },
        "ENGAGING": { title: "Engaging", value: 0, color: "#FFC300" },
        "SUPPORTIVE": { title: "Supportive", value: 0, color: "#DAF7A6" },
        "CLEAR": { title: "Clear", value: 0, color: "#33FFBD" },
        "PASSIONATE": { title: "Passionate", value: 0, color: "#33CFFF" },
        "CONFUSING": { title: "Confusing", value: 0, color: "#8A33FF" },
        "UNFAIR": { title: "Unfair", value: 0, color: "#FF33A1" },
        "BORING": { title: "Boring", value: 0, color: "#FF6F61" },
        "UNHELPFUL": { title: "Unhelpful", value: 0, color: "#FFEB3B" },
        "DISORGANIZED": { title: "Disorganized", value: 0, color: "#00E676" },
        "OTHER": { title: "Other", value: 0, color: "#FCFCFC" }
    })

    return (
        <PieChart
            data={ Object.values(totals).filter((slice) => slice.value != 0 && slice.title != "Other") }
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={{
                fontSize: '3px',
                fill: 'black'
            }}
            radius={25}
            labelPosition={112}
        />
    )
}

export default AttributePie