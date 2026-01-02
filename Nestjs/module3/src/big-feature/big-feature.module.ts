import {BigFeatureService} from './big-feature.service';

export class BigFeatureModule{
    private readonly service= new BigFeatureService();

    execute(){
        return this.service.runFeature();
    }
}