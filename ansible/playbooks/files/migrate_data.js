/*
 * This migrates 2.6 data to 2.7
 */


// The shoulderSlope measurement is now different, so we need to remove it
db.people.updateMany({}, {$unset: { 'measurements.shoulderSlope': '' }})
db.patterns.updateMany({}, {$unset: { 'data.settings.measurements.shoulderSlope': '' }})

// The seatDepth measurement is no longer used, so we remove it
db.people.updateMany({}, {$unset: { 'measurements.seatDepth': '' }})
db.patterns.updateMany({}, {$unset: { 'data.settings.measurements.seatDepth': '' }})

// The hipsToUpperLeg measurement is no longer used, so we remove it
db.people.updateMany({}, {$unset: { 'measurements.hipsToUpperLeg': '' }})
db.patterns.updateMany({}, {$unset: { 'data.settings.measurements.hipsToUpperLeg': '' }})

/* A bunch of circumference measurements have been renamed */
// ankle
db.people.updateMany({}, {$rename: {'measurements.ankleCircumference': 'measurements.ankle'}})
db.patterns.updateMany({}, {$rename: {'data.settings.measurements.ankleCircumference': 'data.settings.measurements.ankle'}})

// biceps
db.people.updateMany({}, {$rename: {'measurements.bicepsCircumference': 'measurements.biceps'}})
db.patterns.updateMany({}, {$rename: {'data.settings.measurements.bicepsCircumference': 'data.settings.measurements.biceps'}})

// chest
db.people.updateMany({}, {$rename: {'measurements.chestCircumference': 'measurements.chest'}})
db.patterns.updateMany({}, {$rename: {'data.settings.measurements.chestCircumference': 'data.settings.measurements.chest'}})

// head
db.people.updateMany({}, {$rename: {'measurements.headCircumference': 'measurements.head'}})
db.patterns.updateMany({}, {$rename: {'data.settings.measurements.headCircumference': 'data.settings.measurements.head'}})

// hips
db.people.updateMany({}, {$rename: {'measurements.hipsCircumference': 'measurements.hips'}})
db.patterns.updateMany({}, {$rename: {'data.settings.measurements.hipsCircumference': 'data.settings.measurements.hips'}})

// knee
db.people.updateMany({}, {$rename: {'measurements.kneeCircumference': 'measurements.knee'}})
db.patterns.updateMany({}, {$rename: {'data.settings.measurements.kneeCircumference': 'data.settings.measurements.knee'}})

// neck
db.people.updateMany({}, {$rename: {'measurements.neckCircumference': 'measurements.neck'}})
db.patterns.updateMany({}, {$rename: {'data.settings.measurements.neckCircumference': 'data.settings.measurements.neck'}})

// seat
db.people.updateMany({}, {$rename: {'measurements.seatCircumference': 'measurements.seat'}})
db.patterns.updateMany({}, {$rename: {'data.settings.measurements.seatCircumference': 'data.settings.measurements.seat'}})

// upperleg
db.people.updateMany({}, {$rename: {'measurements.upperLegCircumference': 'measurements.upperLeg'}})
db.patterns.updateMany({}, {$rename: {'data.settings.measurements.upperLegCircumference': 'data.settings.measurements.upperLeg'}})

// wrist
db.people.updateMany({}, {$rename: {'measurements.wristCircumference': 'measurements.wrist'}})
db.patterns.updateMany({}, {$rename: {'data.settings.measurements.wristCircumference': 'data.settings.measurements.wrist'}})

/* Natural waist is now just waist */
// Waist
db.people.updateMany({}, {$rename: {'measurements.naturalWaist': 'measurements.waist'}})
db.patterns.updateMany({}, {$rename: {'data.settings.measurements.naturalWaist': 'data.settings.measurements.waist'}})

// WaistToFloor
db.people.updateMany({}, {$rename: {'measurements.naturalWaistToFloor': 'measurements.waistToFloor'}})
db.patterns.updateMany({}, {$rename: {'data.settings.measurements.naturalWaistToFloor': 'data.settings.measurements.waistToFloor'}})

// WaistToKnee
db.people.updateMany({}, {$rename: {'measurements.naturalWaistToKnee': 'measurements.waistToKnee'}})
db.patterns.updateMany({}, {$rename: {'data.settings.measurements.naturalWaistToKnee': 'data.settings.measurements.waistToKnee'}})

// WaistToSeat
db.people.updateMany({}, {$rename: {'measurements.naturalWaistToSeat': 'measurements.waistToSeat'}})
db.patterns.updateMany({}, {$rename: {'data.settings.measurements.naturalWaistToSeat': 'data.settings.measurements.waistToSeat'}})

// WaistToUnderbust
db.people.updateMany({}, {$rename: {'measurements.naturalWaistToUnderbust': 'measurements.waistToUnderbust'}})
db.patterns.updateMany({}, {$rename: {'data.settings.measurements.naturalWaistToUnderbust': 'data.settings.measurements.waistToUnderbust'}})

// WaistToHips
db.people.updateMany({}, {$rename: {'measurements.naturalWaistToHip': 'measurements.waistToHips'}})
db.patterns.updateMany({}, {$rename: {'data.settings.measurements.naturalWaistToHip': 'data.settings.measurements.waistToHips'}})


/* seatDepth is no longer uses */
