// Extend the operateVehicle function to include a Truck with a loadCargo method.
class Vehicle {
    operate() {
        console.log("Operating vehicle");
    }
}

class Truck extends Vehicle{
    loadCargo(): void {
        console.log("loading cargo..");
    }
}

function operateVehicle(vehicle:Vehicle){
    vehicle.operate();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo();
    }
}

const myTruck = new Truck();
operateVehicle(myTruck);