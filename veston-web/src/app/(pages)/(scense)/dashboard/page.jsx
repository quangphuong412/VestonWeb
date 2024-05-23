import {
    Card,
    CardContent,
    CardDescription,
    // CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import TableDashboard from "./TableDashboard"

export default function Dashboard() {

    return (
        <>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Users</CardTitle>
                    <CardDescription>
                        Recent Users.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TableDashboard />
                </CardContent>
            </Card>
        </>
    )
}
