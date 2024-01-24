import { createSlice } from "@reduxjs/toolkit";

export type BuildingObject = {
    buildingId: string,
    buildingName: string
};

const initialBuildings: Array<BuildingObject> = [];

export const buildingSlice = createSlice({
    name: 'building',
    initialState: {
        buildings: initialBuildings
    },
    reducers: {
        fetchBuildings: (state, action) => {
            const buildings = action.payload;
            state.buildings = buildings;
        }
    }
});

export const { 
    fetchBuildings
} = buildingSlice.actions;

export default buildingSlice.reducer;