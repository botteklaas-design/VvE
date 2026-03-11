import { getAllSubscriptionRequests } from "@/lib/queries/subscription";
import { updateSubscriptionRequestStatus, deleteSubscriptionRequest } from "@/actions/subscription";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AbonnementenPage() {
  const requests = getAllSubscriptionRequests();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Abonnementverzoeken</h1>
        <p className="text-gray-500 text-sm mt-1">
          Beheer alle aanvragen voor abonnementen
        </p>
      </div>

      <div className="grid gap-4">
        {requests.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              Geen abonnementverzoeken gevonden.
            </CardContent>
          </Card>
        ) : (
          requests.map((request) => (
            <Card key={request.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    {request.lid_naam}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    Aangevraagd op: {new Date(request.created_at).toLocaleDateString("nl-NL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </p>
                </div>
                <Badge
                  variant={
                    request.status === "approved"
                      ? "default"
                      : request.status === "rejected"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {request.status === "pending" && "In behandeling"}
                  {request.status === "approved" && "Goedgekeurd"}
                  {request.status === "rejected" && "Afgewezen"}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {request.bericht && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-700">{request.bericht}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  {request.status !== "approved" && (
                    <form
                      action={async () => {
                        "use server";
                        await updateSubscriptionRequestStatus(request.id, "approved");
                      }}
                    >
                      <Button type="submit" size="sm" variant="default">
                        Goedkeuren
                      </Button>
                    </form>
                  )}
                  {request.status !== "rejected" && (
                    <form
                      action={async () => {
                        "use server";
                        await updateSubscriptionRequestStatus(request.id, "rejected");
                      }}
                    >
                      <Button type="submit" size="sm" variant="destructive">
                        Afwijzen
                      </Button>
                    </form>
                  )}
                  <form
                    action={async () => {
                      "use server";
                      await deleteSubscriptionRequest(request.id);
                    }}
                  >
                    <Button type="submit" size="sm" variant="outline">
                      Verwijderen
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}