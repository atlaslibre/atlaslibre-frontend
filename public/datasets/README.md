# List of sources and respective licenses

## timezones.topo.json

Derived from Natural Earth Data (1:10, https://www.naturalearthdata.com/downloads/) and reduced in size

Convert from Shapefile to GeoJSON:
`ogr2ogr -f GeoJSON -t_srs crs:84 ne_10m_time_zones.geojson ne_10m_time_zones.shp`

Convert from GeoJSON to TopoJSON
`geo2topo -o timezones-intermediate.topo.json -q 1e3  ne_10m_time_zones.geojson`
`toposimplify timezones-intermediate.topo.json  > timezones.topo.json`

The data source is public domain.