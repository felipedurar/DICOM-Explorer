import DicomMetaData from "./dicom-meta-data";

export default class InstanceModel {
    public dicomMetaData: DicomMetaData | null = null;

    // public PatientName: string = '';
    // public PatientID: string = '';
    // public Sex: string = '';

    // public StudyInstanceUID: string = '';
    // public SeriesInstanceUID: string = '';
    // public StudyDescription: string = '';
    // public StudyDate: string = '';
    public SOPInstanceUID: string = '';
    public InstanceNumber: number = 0;

    public NumberOfFrames = -1;

    // Runtime
    // public ImagePreview: HTMLImageElement = new Image();

    constructor(_dicomMetaDataObj: any) {
        this.dicomMetaData = new DicomMetaData();
        this.dicomMetaData.rawMetaData = _dicomMetaDataObj;
        this.parseMetaData();
    }

    public parseMetaData() {

        this.SOPInstanceUID = this.dicomMetaData?.getArrayItemValueByDicomTag('00080018');
        
        const numberOfFrames = this.dicomMetaData?.getArrayItemValueByDicomTag('00280008');
        if (!!numberOfFrames) this.NumberOfFrames = parseInt(numberOfFrames);

        const instanceNumber = this.dicomMetaData?.getArrayItemValueByDicomTag('00200013');
        if (!!instanceNumber) this.InstanceNumber = parseInt(instanceNumber);

        // this.PatientName = this.dicomMetaData?.getValueByDicomTag('00100010')[0].Alphabetic;
        // this.PatientID = this.dicomMetaData?.getValueByDicomTag('00100020')[0];
        // this.Sex = this.dicomMetaData?.getValueByDicomTag('00100040')[0];

        // this.StudyInstanceUID = this.dicomMetaData?.getArrayItemValueByDicomTag('0020000D');
        // this.SeriesInstanceUID = this.dicomMetaData?.getArrayItemValueByDicomTag('0020000E');
        // this.StudyDescription = this.dicomMetaData?.getValueByDicomTag('00081030')[0];
        // this.StudyDate = this.dicomMetaData?.getValueByDicomTag('00080020')[0];
    }
    
}
