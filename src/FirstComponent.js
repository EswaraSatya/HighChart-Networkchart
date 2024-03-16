import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsNetworkgraph from "highcharts/modules/networkgraph";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";

// Initialize the required Highcharts modules
HighchartsNetworkgraph(Highcharts);
HighchartsExporting(Highcharts);
HighchartsAccessibility(Highcharts);

export const getRandomColor = () => {
    var r, g, b;
    do {
        // Generate random values for red, green, and blue components
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    } while ((r < 30 && g < 30 && b < 30) || (r > 225 && g > 225 && b > 225)); // Exclude black and white colors

    // Construct the color string in hexadecimal format
    var color = "#" + r.toString(16) + g.toString(16) + b.toString(16);

    return color;
};

// Function to generate an array of random colors
export const generateRandomColorsArray = (numColors) => {
    var colorsArray = [];

    for (var i = 0; i < numColors; i++) {
        var randomColor = getRandomColor();
        colorsArray.push(randomColor);
    }

    return colorsArray;
};

const FirstComponent = () => {
    const jsonData = [
        {
            "from": "Astrazeneca",
            "sector": "Drug discovery and development",
            "marketValue": 551,
            "partnership": "investment",
            "modality": "Cell therapy",
            "to": "BlueRock Therapeutics"
        },
        {
            "from": "Merck",
            "sector": "Drug discovery and development",
            "marketValue": 856,
            "partnership": "investment",
            "modality": "Gene therapy",
            "to": "Asklepios BioPharmaceutical"
        },
        {
            "from": "Brissectorl",
            "sector": "Drug delivery technology",
            "marketValue": 753,
            "partnership": "investment",
            "modality": "Gene therapy",
            "to": "Acuitas Therapeutics, Inc."
        },
        {
            "from": "Pfizer",
            "sector": "Drug discovery and development",
            "marketValue": 615,
            "partnership": "investment",
            "modality": "Gene circuit-engineered cell and gene therapies",
            "to": "Senti Biosciences, Inc."
        },
        {
            "from": "Sanofi",
            "sector": "Drug discovery and development",
            "marketValue": 710,
            "partnership": "investment",
            "modality": "T-cell therapy",
            "to": "Triumvira Immunologics Inc"
        },
        {
            "from": "Bayer",
            "sector": "Drug discovery and development",
            "marketValue": 331,
            "partnership": "investment",
            "modality": "Targeted Alpha Therapies (TATs)",
            "to": "Noria Therapeutics"
        },
        {
            "from": "Johnson & Johnson",
            "sector": "Drug discovery and development",
            "marketValue": 859,
            "partnership": "investment",
            "modality": "Drug development  in Women’s Healthcare",
            "to": "KaNDy Therapeutics Ltd"
        },
        {
            "from": "Novartis",
            "sector": "Drug discovery and development",
            "marketValue": 193,
            "partnership": "investment",
            "modality": "Drug development  in Women’s Healthcare",
            "to": "Systems Oncology"
        },
        {
            "from": "Roche",
            "sector": "Drug discovery and development",
            "marketValue": 567,
            "partnership": "investment",
            "modality": "Gene editing technologies (CRISPR)",
            "to": "Casebia Therapeutics (CRISPR Therapeutics and Bayer joint venture)"
        },
        {
            "from": "Abbvie",
            "sector": "Drug discovery and development",
            "marketValue": 975,
            "partnership": "investment",
            "modality": "Gene editing technologies (CRISPR)",
            "to": "Metagenomi Technologies"
        },
        {
            "from": "Amgen",
            "sector": "Biotechnology",
            "marketValue": 224,
            "partnership": "investment",
            "modality": "Precision digital health",
            "to": "Huma Therapeutics"
        },
        {
            "from": "BioNTech",
            "sector": "Biotechnology",
            "marketValue": 670,
            "partnership": "investment",
            "modality": "Precision digital health",
            "to": "Ada Health"
        },
        {
            "from": "Boehringer Ingelheim",
            "sector": "Biotechnology",
            "marketValue": 409,
            "partnership": "investment",
            "modality": "Precision digital health",
            "to": "One Drop"
        },
        {
            "from": "Eli Lilly",
            "sector": "Drug delivery technology",
            "marketValue": 121,
            "partnership": "investment",
            "modality": "Gene editing technologies (CRISPR)",
            "to": "Vesigen Therapeutics"
        },
        {
            "from": "Gilead Sciences",
            "sector": "Live Biotherapeutics Products (LBPs)",
            "marketValue": 584,
            "partnership": "investment",
            "modality": "Microbiome-based therapies",
            "to": "Azitra Inc."
        },
        {
            "from": "GSK",
            "sector": "Live Biotherapeutics Products (LBPs)",
            "marketValue": 760,
            "partnership": "investment",
            "modality": "Microbiome-based therapies",
            "to": "Bloom Science"
        },
        {
            "from": "Merck KGaA",
            "sector": "Biotechnology",
            "marketValue": 424,
            "partnership": "investment",
            "modality": "Precision digital health",
            "to": "Elly Health"
        },
        {
            "from": "Moderna",
            "sector": "Biotechnology",
            "marketValue": 466,
            "partnership": "investment",
            "modality": "Precision digital health",
            "to": "Wellthy Therapeutics"
        },
        {
            "from": "Novo Nordisk",
            "sector": "Biotechnology",
            "marketValue": 527,
            "partnership": "investment",
            "modality": "Precision digital health",
            "to": "Visotec GmbH"
        },
        {
            "from": "Takeda Pharmaceutical",
            "sector": "Biotechnology",
            "marketValue": 798,
            "partnership": "investment",
            "modality": "Precision digital health",
            "to": "Upside Health"
        },
        {
            "from": "Astrazeneca",
            "sector": "Biotechnology",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Precision digital health",
            "to": "Huma Therapeutics"
        },
        {
            "from": "Merck",
            "sector": "Biotechnology",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Precision digital health",
            "to": "Ada Health"
        },
        {
            "from": "Brissectorl",
            "sector": "Biotechnology",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Precision digital health",
            "to": "One Drop"
        },
        {
            "from": "Pfizer",
            "sector": "Drug delivery technology",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Gene editing technologies (CRISPR)",
            "to": "Vesigen Therapeutics"
        },
        {
            "from": "Sanofi",
            "sector": "Live Biotherapeutics Products (LBPs)",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Microbiome-based therapies",
            "to": "Azitra Inc."
        },
        {
            "from": "Bayer",
            "sector": "Live Biotherapeutics Products (LBPs)",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Microbiome-based therapies",
            "to": "Bloom Science"
        },
        {
            "from": "Johnson & Johnson",
            "sector": "Biotechnology",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Precision digital health",
            "to": "Elly Health"
        },
        {
            "from": "Novartis",
            "sector": "Biotechnology",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Precision digital health",
            "to": "Wellthy Therapeutics"
        },
        {
            "from": "Roche",
            "sector": "Biotechnology",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Precision digital health",
            "to": "Visotec GmbH"
        },
        {
            "from": "Abbvie",
            "sector": "Biotechnology",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Precision digital health",
            "to": "Upside Health"
        },
        {
            "from": "Amgen",
            "sector": "Drug discovery and development",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Cell therapy",
            "to": "BlueRock Therapeutics"
        },
        {
            "from": "BioNTech",
            "sector": "Drug discovery and development",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Gene therapy",
            "to": "Asklepios BioPharmaceutical"
        },
        {
            "from": "Boehringer Ingelheim",
            "sector": "Drug delivery technology",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Gene therapy",
            "to": "Acuitas Therapeutics, Inc."
        },
        {
            "from": "Eli Lilly",
            "sector": "Drug discovery and development",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Gene circuit-engineered cell and gene therapies",
            "to": "Senti Biosciences, Inc."
        },
        {
            "from": "Gilead Sciences",
            "sector": "Drug discovery and development",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "T-cell therapy",
            "to": "Triumvira Immunologics Inc"
        },
        {
            "from": "GSK",
            "sector": "Drug discovery and development",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Targeted Alpha Therapies (TATs)",
            "to": "Noria Therapeutics"
        },
        {
            "from": "Merck KGaA",
            "sector": "Drug discovery and development",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Drug development  in Women’s Healthcare",
            "to": "KaNDy Therapeutics Ltd"
        },
        {
            "from": "Moderna",
            "sector": "Drug discovery and development",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Drug development  in Women’s Healthcare",
            "to": "Systems Oncology"
        },
        {
            "from": "Novo Nordisk",
            "sector": "Drug discovery and development",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Gene editing technologies (CRISPR)",
            "to": "Casebia Therapeutics (CRISPR Therapeutics and Bayer joint venture)"
        },
        {
            "from": "Takeda Pharmaceutical",
            "sector": "Drug discovery and development",
            "marketValue": null,
            "partnership": "partnership",
            "modality": "Gene editing technologies (CRISPR)",
            "to": "Metagenomi Technologies"
        }
    ]

    const [partnershipFilter, setPartnershipFilter] = useState([]);

    const partnershipTypes = Array.from(
        new Set(jsonData.map((item) => item.partnership))
    );

    useEffect(() => {
        // Filter data based on partnership
        const filteredJsonData = jsonData.filter((item) =>
            partnershipFilter.includes(item.partnership.toLowerCase())
        );
        const afterSetOptionsHandler = function (e) {
            var numColors = 250;
            var randomColors = generateRandomColorsArray(numColors);
            const colors = randomColors;
            const nodes = {};
            const colorMap = {}; // Mapping of "to" values to colors
            let i = 0;

            if (this instanceof Highcharts.Series && e.options.id === "lang-tree") {

                let mainNode = null;

                // Find the main node
                e.options.data.forEach(function (link) {
                    if (!mainNode) {
                        mainNode = link.from;
                    }
                });

                e.options.data.forEach(function (link) {
                    if (!nodes[link.from]) {
                        nodes[link.from] = {
                            id: link.from,
                            marketValue: link.marketValue + "M",
                            partnership: link.partnership, // Ensure partnership is set
                            marker: {
                                radius: link.from === "Bayer" ||
                                    link.from === "Astrazeneca" ||
                                    link.from === "Merck" ||
                                    link.from === "AbbVie" ||
                                    link.from === "Novartis" ||
                                    link.from === "Bristol-Myers Squibb" ||
                                    link.from === "Johnson & Johnson" ||
                                    link.from === "Pfizer" ||
                                    link.from === "Sanofi" ||
                                    link.from === "Amgen" ||
                                    link.from === "BioNTech" ||
                                    link.from === "Boehringer Ingelheim" ||
                                    link.from === "Eli Lilly" ||
                                    link.from === "Gilead Sciences" ||
                                    link.from === "GSK" ||
                                    link.from === "Merck KGaA" ||
                                    link.from === "Moderna" ||
                                    link.from === "Novo Nordisk" ||
                                    link.from === "Takeda Pharmaceutical" ||
                                    link.from === "Roche" ? 1 : 10,
                            },
                            color: colorMap[link.to],
                            Modality: link.Modality,
                            to: link.to,
                        };
                    }

                    if (!nodes[link.to]) {
                        nodes[link.to] = {
                            id: link.to,
                            marketValue: (link.marketValue == null || link.marketValue == "NA") ? "" : link.marketValue + "M", // Sample market value (you can replace it with your actual data)
                            partnership: link.partnership, // Ensure partnership is set
                            marker: {
                                // radius: Math.max(5, Math.floor(Math.random() * 20) + 1), // Random radius between 1 and 20
                                radius: 10,
                            },
                            Modality: link.Modality,
                            to: link.to,
                            color: colorMap[link.to],
                            companyName: link.companyName
                        };
                    }
                    if (!colorMap[link.to]) {
                        colorMap[link.to] = colors[i++];
                    }

                    // Set the color for the current node based on the "to" value
                    nodes[link.from].color = colorMap[link.to];
                    nodes[link.to].color = colorMap[link.to];

                    // Set the color for the link based on the "to" value
                    link.color = colorMap[link.to];
                });

                e.options.nodes = Object.keys(nodes).map(function (id) {
                    return nodes[id];
                });

            }
        };

        // Add event listener
        Highcharts.addEvent(
            Highcharts.Series,
            "afterSetOptions",
            afterSetOptionsHandler
        );
        const options = {
            chart: {
                type: "networkgraph",
                height: "100%",
                plotBorderWidth: 1,
            },
            legend: {
                enabled: true, // Enable the legend
            },

            plotOptions: {
                networkgraph: {
                    link: { color: "red", width: "3" },
                    keys: ["from"],
                    layoutAlgorithm: {
                        integration: "verlet",
                        linkLength: 180,
                        enableSimulation: true,
                        gravitationalConstant: 10,
                    },
                    marker: {
                        radius: 10, // Set the radius of all bubbles to 30
                    },
                },
            },
            series: [
                {
                    showInLegend: false,
                    dataLabels: false,
                    accessibility: {
                        enabled: false,
                    },
                    allowOverlap: true, // Allow labels to overlap
                    dataLabels: {
                        enabled: true,
                        useHTML: true,
                        verticalAlign: "middle",
                        align: "center",
                        linkFormat: "",
                        textPath: {
                            enabled: true,
                        },
                        formatter: function () {
                            var logoUrl;
                            var content;
                            if (this.point.name === "Brissectorl") {
                                logoUrl = "https://www.vyopta.com/wp-content/uploads/2019/06/astrazeneca-PNG-logo.png";
                            } else if (this.point.name === "Merck") {
                                logoUrl = "https://download.logo.wine/logo/Merck_%26_Co./Merck_%26_Co.-Logo.wine.png";
                            } else if (this.point.name === "AbbVie") {
                                logoUrl = "https://1000logos.net/wp-content/uploads/2023/03/AbbVie-logo.png";
                            } else if (this.point.name === "Novartis") {
                                logoUrl = "https://www.novartis.com/sites/novartis_com/files/styles/webp/public/2021-10/novartis-logo-transparent.png.webp?itok=-VFFv5qx";
                            } else if (this.point.name === "Bristol-Myers Squibb") {
                                logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Bristol-Myers_Squibb_logo_%282020%29.svg/1280px-Bristol-Myers_Squibb_logo_%282020%29.svg.png";
                            } else if (this.point.name === "Johnson & Johnson") {
                                logoUrl = "https://jnj-content-lab2.brightspotcdn.com/dims4/default/9849760/2147483647/strip/true/crop/499x374+0+63/resize/1005x753!/quality/90/?url=https%3A%2F%2Fjnj-production-jnj.s3.us-east-1.amazonaws.com%2Fbrightspot%2F9a%2F76%2Fbd7b1a4c104486eb82033ce4df92%2Flogo-130-x-130-1.png";
                            } else if (this.point.name === "Pfizer") {
                                logoUrl = "https://upload.wikimedia.org/wikipedia/commons/8/8b/Pfizer_%282021%29.png";
                            } else if (this.point.name === "Bayer") {
                                logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Logo_Bayer.svg/600px-Logo_Bayer.svg.png";
                            } else if (this.point.name === "Sanofi") {
                                logoUrl = "https://upload.wikimedia.org/wikipedia/commons/7/7d/Logo_Sanofi_%282022%29.png";
                            } else if (this.point.name === "Amgen") {
                                logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Amgen.svg/1200px-Amgen.svg.png";
                            } else if (this.point.name === "BioNTech") {
                                logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/BioNTech_Logo.png/1197px-BioNTech_Logo.png";
                            } else if (this.point.name === "Boehringer Ingelheim") {
                                logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Boehringer_Ingelheim_Logo.svg/2560px-Boehringer_Ingelheim_Logo.svg.png";
                            } else if (this.point.name === "Eli Lilly") {
                                logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Eli_Lilly_and_Company.svg/2560px-Eli_Lilly_and_Company.svg.png";
                            } else if (this.point.name === "Gilead Sciences") {
                                logoUrl = "https://download.logo.wine/logo/Gilead_Sciences/Gilead_Sciences-Logo.wine.png";
                            } else if (this.point.name === "GSK") {
                                logoUrl = "https://upload.wikimedia.org/wikipedia/en/thumb/3/32/GSK_logo_2022.svg/2560px-GSK_logo_2022.svg.png";
                            } else if (this.point.name === "Merck KGaA") {
                                logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Logo_Merck_KGaA_2015.svg/1200px-Logo_Merck_KGaA_2015.svg.png";
                            } else if (this.point.name === "Moderna") {
                                logoUrl = "https://www.jdrf.org/wp-content/uploads/2020/04/Moderna-Logo-1200x800-1.jpg";
                            } else if (this.point.name === "Novo Nordisk") {
                                logoUrl = "https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Novo_Nordisk_-_Logo.svg/1200px-Novo_Nordisk_-_Logo.svg.png";
                            } else if (this.point.name === "Takeda Pharmaceutical") {
                                logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Takeda_Pharmaceutical_Company_logo.svg/2560px-Takeda_Pharmaceutical_Company_logo.svg.png";
                            } else if (this.point.name === "Roche") {
                                logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Hoffmann-La_Roche_logo.svg/2560px-Hoffmann-La_Roche_logo.svg.png";
                            }

                            if (logoUrl) {
                                content =
                                    '<div style="border: 1px solid; width: 50px; height: 50px; border-radius: 50px;background:white">' +
                                    '<img src="' +
                                    logoUrl +
                                    '" style="width: 50px; height: 50px;border-radius: 50px;  ' +
                                    (this.y - 10) +
                                    "px; left: " +
                                    (this.x - 10) +
                                    'px;">' +
                                    "</div>";
                            }

                            if (!logoUrl) {
                                content =
                                    "<div style='margin-bottom: 70px;font-size: 8px;'>" +
                                    "<div>" +
                                    this.point.to +
                                    "</div>" +
                                    "<div style='display: flex;'>" +
                                    "<div>" +
                                    this.point.marketValue +
                                    "</div>" +
                                    "<div>(" +
                                    this.point.partnership +
                                    ")</div>" +
                                    "</div>" +
                                    "</div>";
                            }
                            return content;
                        },
                    },
                    marker: {
                        symbol: "circle",
                    },
                    id: "lang-tree",
                    accessibility: {
                        enabled: false,
                    },
                    // name: "Bayer",
                    data: filteredJsonData.length != 0 ? filteredJsonData : jsonData,
                },
            ],
        };
        Highcharts.chart("container", options);
    }, [partnershipFilter]);

    useEffect(() => {
        // Check all checkboxes by default
        setPartnershipFilter(partnershipTypes.map((type) => type.toLowerCase()));
    }, []);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setPartnershipFilter((prevFilters) => {
            if (checked) {
                return [...prevFilters, value];
            } else {
                return prevFilters.filter((filter) => filter !== value);
            }
        });
    };

    return (
        <div>
            <div>
                <label>Filter by Partnership:</label>
                {partnershipTypes.map((partnership) => (
                    <div key={partnership}>
                        <input
                            type="checkbox"
                            id={partnership}
                            value={partnership.toLowerCase()}
                            checked={partnershipFilter.includes(partnership.toLowerCase())}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor={partnership}>{partnership}</label>
                    </div>
                ))}
            </div>
            <div id="container" style={{ width: "100%", height: "100%" }}></div>
        </div>
    );
};

export default FirstComponent;
