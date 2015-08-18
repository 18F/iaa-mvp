if (!(typeof MochaWeb === 'undefined')) {
    MochaWeb.testOnly(function() {
        var assert = chai.assert;
        
        describe("form7600a", function() {

            describe("transformToPdfAttributes", function() {
                var actual;
                var servicingAgency = "18F";
                var servicingAgencyMailingAddress = "1800 F Street NW";
                var servicingAgencyCity = "Washington";
                var servicingAgencyState = "DC";
                var servicingAgencyZip = "20405";
                var servicingAgencyTrackingNumber = "6222827";
                var requestingAgency = "The White House";
                var requestingAgencyMailingAddress = "1600 Pennsylvania Avenue NW";
                var requestingAgencyCity = "Washington";
                var requestingAgencyState = "DC";
                var requestingAgencyZip = "20500";
                
                before(function() {
                    var formData = {
                        "parties-servicing-agency-name" : servicingAgency,
                        "parties-servicing-agency-mailing-address-street-address" : servicingAgencyMailingAddress,
                        "parties-servicing-agency-mailing-address-city" : servicingAgencyCity,
                        "parties-servicing-agency-mailing-address-state" : servicingAgencyState,
                        "parties-servicing-agency-mailing-address-zip" : servicingAgencyZip,
                        "servicing-agency-tracking-number" : servicingAgencyTrackingNumber,
                        "parties-requesting-agency-name" : requestingAgency,
                        "parties-requesting-agency-mailing-address-street-address" : requestingAgencyMailingAddress,
                        "parties-requesting-agency-mailing-address-city" : requestingAgencyCity,
                        "parties-requesting-agency-mailing-address-state" : requestingAgencyState,
                        "parties-requesting-agency-mailing-address-zip" : requestingAgencyZip
                    };

                    actual = TransformForm7600AToPDFAttributes(formData);
                });
                
                describe("servicing_agency_name", function() {
                    it("transforms servicing_agency_name", function() {
                        assert.equal(actual.servicing_agency_name, servicingAgency);
                    });
                });

                describe("servicing_agency_address", function() {
                    it("transforms servicing_agency_address completely", function() {
                        assert.equal(actual.servicing_agency_address,
                                     servicingAgencyMailingAddress + ", " + servicingAgencyCity +
                                     ", " + servicingAgencyState + " " + servicingAgencyZip);
                    });
                });

                describe("servicing_agency_tracking_number", function() {
                    it("transforms servicing_agency_tracking_number", function() {
                        assert.equal(actual.servicing_agency_tracking_number, servicingAgencyTrackingNumber);
                    });
                });
                
                describe("requesting_agency_address", function() {
                    it("transforms requesting_agency_address completely", function() {
                        assert.equal(actual.requesting_agency_address,
                                     requestingAgencyMailingAddress + ", " + requestingAgencyCity +
                                     ", " + requestingAgencyState + " " + requestingAgencyZip);
                    });
                });

                describe("requesting_agency_name_of_products_services", function() {
                    it("transforms agency_name_of_products_service", function() {
                        assert.equal(actual.requesting_agency_name_of_products_services,
                                     requestingAgency);
                    });
                });
            });
            
        });
    });
}
