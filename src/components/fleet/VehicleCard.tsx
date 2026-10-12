import type { Vehicle } from "@/lib/types";
import { vehiclePhoto } from "@/lib/fleetMedia";
import { Badge } from "@/components/ui/Badge";
import { VehiclePlaceholder } from "@/components/ui/PlaceholderIcons";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const photo = vehiclePhoto(vehicle);
  const alt = `${vehicle.name} — ${vehicle.licence_class_label} ${vehicle.transmission_label}`;

  return (
    <article className="rounded-2xl bg-white p-5 shadow-[var(--card-shadow)] ring-1 ring-black/5">
      <div className="mb-4 flex h-28 items-end justify-center">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={alt} className="max-h-full w-auto max-w-full object-contain" />
        ) : (
          <VehiclePlaceholder
            name={alt}
            licenceClass={vehicle.licence_class}
            vehicleType={vehicle.vehicle_type}
          />
        )}
      </div>
      <div className="mb-2 flex flex-wrap gap-2">
        <Badge tone="brand">{vehicle.licence_class_label}</Badge>
        <Badge tone="neutral">{vehicle.transmission_label}</Badge>
      </div>
      <h3 className="font-display text-xl font-semibold text-[var(--ink)]">{vehicle.name}</h3>
      <p className="mt-1 text-sm text-[var(--muted)]">
        {vehicle.make_model || vehicle.vehicle_type_label}
        {vehicle.branch_name ? ` · ${vehicle.branch_name}` : ""}
      </p>
      {vehicle.public_description ? (
        <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/80">
          {vehicle.public_description}
        </p>
      ) : null}
    </article>
  );
}
