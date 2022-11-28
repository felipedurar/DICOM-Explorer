import DicomMetaData from "./dicom-meta-data";
import InstanceModel from "./instance.model";

export default class SerieModel {
    public dicomMetaData: DicomMetaData | null = null;

    // public PatientName: string = '';
    // public PatientID: string = '';
    // public Sex: string = '';

    public StudyInstanceUID: string = '';
    public SeriesInstanceUID: string = '';
    // public StudyDescription: string = '';
    // public StudyDate: string = '';
    public  NumberOfSeriesRelatedInstances: number = 0;

    // Runtime
    public ImagePreviewURL: string = '';
    public ImagePreviewLoaded: boolean = false;

    //
    public instances: InstanceModel[] = [];

    constructor(_dicomMetaDataObj: any) {
        this.dicomMetaData = new DicomMetaData();
        this.dicomMetaData.rawMetaData = _dicomMetaDataObj;
        this.parseMetaData();
    }

    public parseMetaData() {
        
        // this.PatientName = this.dicomMetaData?.getValueByDicomTag('00100010')[0].Alphabetic;
        // this.PatientID = this.dicomMetaData?.getValueByDicomTag('00100020')[0];
        // this.Sex = this.dicomMetaData?.getValueByDicomTag('00100040')[0];

        this.StudyInstanceUID = this.dicomMetaData?.getArrayItemValueByDicomTag('0020000D');
        this.SeriesInstanceUID = this.dicomMetaData?.getArrayItemValueByDicomTag('0020000E');

        const numberOfSeriesRelatedInstances = this.dicomMetaData?.getArrayItemValueByDicomTag('00201209');
        if (!!numberOfSeriesRelatedInstances) this.NumberOfSeriesRelatedInstances = parseInt(numberOfSeriesRelatedInstances);
        // this.StudyDescription = this.dicomMetaData?.getValueByDicomTag('00081030')[0];
        // this.StudyDate = this.dicomMetaData?.getValueByDicomTag('00080020')[0];
    }
    
}
