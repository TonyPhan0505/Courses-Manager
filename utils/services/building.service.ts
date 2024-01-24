import { BuildingObject } from '../../redux/slices/building.slice';

export const getBuilding = (BuildingsData: Array<BuildingObject>, buildingId: string) => {
    const building = BuildingsData.filter((buildingItem) => {
        return buildingItem.buildingId === buildingId;
    })[0];
    return building;
};

export const getBuildingName = (BuildingsData: Array<BuildingObject>, buildingId: string) => {
    const building = getBuilding(BuildingsData, buildingId);
    if (!building) {
        return "undefined";
    } else {
        return building.buildingName;
    }
};