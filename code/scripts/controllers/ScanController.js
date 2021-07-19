import {EVENT_REFRESH, LocalizedController} from "../../assets/pdm-web-components/index.esm.js";

/**
 * Controls Application Flow
 *
 * Handles data input and validation for the manipulation of Batches
 * @class ScanController
 * @module controllers
 */
export default class ScanController extends LocalizedController {

    initializeModel = () => ({});

    constructor(...args) {
        super(false, ...args)
        let self = this;
        super.bindLocale(this, "scan");
        this.model = self.initializeModel();

        self.on(EVENT_REFRESH, async (evt) => {
            evt.preventDefault();
            evt.stopImmediatePropagation();
            await self.showBarcodeScanner({
                title: self.translate('title'),
                data: evt.detail
            }, self._parseScan.bind(self));
        }, {capture: true});
    }

    async _parseScan(err, scanData) {
        console.log(scanData);
        const self = this;
        const scannedData = scanData.result;
        self.model.scannedData = scannedData;
        const html = `<ion-badge color="primary"> Data: < ${scannedData} > </ion-badge>`
        const div = document.createElement('div');
        div.innerHTML = html;
        document.getElementById('response').appendChild(div);
    }
}
