export class BigFeatureService{
    runFeature() {
        return {
            feature:"Big Feature Loaded Lazily",
            time: new Date().toISOString()
        }
    }
}