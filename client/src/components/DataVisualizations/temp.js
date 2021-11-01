{
	"_id": {
		"$oid": "617f4755865c04e49ede6e2c"
	},
	"passName": "ExcelsiorPass",
	"FlowDiagram": [{
			"id": "horizontal-1",
			"sourcePosition": "right",
			"type": "input",
			"className": "dark-node",
			"data": {
				"label": "User"
			},
			"position": {
				"x": 0,
				"y": 80
			}
		},
		{
			"id": "horizontal-2",
			"sourcePosition": "right",
			"targetPosition": "left",
			"data": {
				"label": "Excelsior Wallet"
			},
			"position": {
				"x": 250,
				"y": 0
			}
		},
		{
			"id": "horizontal-3",
			"sourcePosition": "right",
			"targetPosition": "left",
			"data": {
				"label": "Scanner"
			},
			"position": {
				"x": 250,
				"y": 160
			}
		},
		{
			"id": "horizontal-4",
			"sourcePosition": "right",
			"targetPosition": "left",
			"data": {
				"label": "Web Portal"
			},
			"position": {
				"x": 500,
				"y": 0
			}
		},
		{
			"id": "horizontal - 5",
			"sourcePosition": "top",
			"targetPosition": "bottom",
			"data": {
				"label": "Identity Health Pass"
			},
			"position": {
				"x": 500,
				"y": 100
			}
		},
		{
			"id": "horizontal-6",
			"sourcePosition": "bottom",
			"targetPosition": "top",
			"data": {
				"label": "Credentials"
			},
			"position": {
				"x": 500,
				"y": 230
			}
		},
		{
			"id": "horizontal-8",
			"sourcePosition": "right",
			"targetPosition": "left",
			"data": {
				"label": "Database"
			},
			"position": {
				"x": 750,
				"y": 300
			}
		},
		{
			"id": "horizontal-e1-2",
			"source": "horizontal-1",
			"type": "smoothstep",
			"target": "horizontal-2",
			"style": {
				"stroke": "#86BC25"
			},
			"label": "Holder",
			"animated": true
		},
		{
			"id": "horizontal-e1-3",
			"source": "horizontal-1",
			"type": "smoothstep",
			"style": {
				"stroke": "#86BC25"
			},
			"target": "horizontal-3",
			"label": "Verifier",
			"animated": true
		},
		{
			"id": "horizontal-e2-3",
			"source": "horizontal-2",
			"type": "smoothstep",
			"style": {
				"stroke": "#86BC25"
			},
			"target": "horizontal-3",
			"label": "Scan QR",
			"arrowHeadType": "arrow",
			"animated": true
		},
		{
			"id": "horizontal-e1-4",
			"source": "horizontal-2",
			"type": "smoothstep",
			"target": "horizontal-4",
			"style": {
				"stroke": "#86BC25"
			},
			"label": "Get Pass",
		},
		{
			"id": "horizontal-e3-5",
			"source": "horizontal-3",
			"type": "smoothstep",
			"style": {
				"stroke": "#86BC25"
			},
			"target": "horizontal-5",
			"label": "Validate QR",
			"animated": true
		},
		{
			"id": "horizontal-e3-6",
			"source": "horizontal-3",
			"style": {
				"stroke": "#86BC25"
			},
			"type": "smoothstep",
			"target": "horizontal-6",
			"animated": true
		},
		{
			"id": "horizontal-e5-7",
			"style": {
				"stroke": "#86BC25"
			},
			"source": "horizontal-5",
			"type": "smoothstep",
			"target": "horizontal-7",
			"animated": true
		},
		{
			"id": "horizontal-e6-8",
			"source": "horizontal-6",
			"type": "smoothstep",
			"style": {
				"stroke": "#86BC25"
			},
			"target": "horizontal-8",
			"label": "No PII/PHI",
			"animated": true
		}
	]
}