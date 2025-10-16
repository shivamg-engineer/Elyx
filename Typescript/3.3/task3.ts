// Challenge: Modify the function to handle a Plane object with a fly method.

interface Car {
    drive: () => void;
}
interface Boat {
    sail: () => void;
}

interface Plane {
    fly: () => void;
}

function operateVehicle(vehicle: Car | Boat | Plane) {
    if ("drive" in vehicle) {
        vehicle.drive();
    } else if ("sail" in vehicle) {
        vehicle.sail();
    } else {
        vehicle.fly();
    }
}
