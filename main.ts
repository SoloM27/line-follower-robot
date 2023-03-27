let avoiding = 0
let IRL = 0
let Irr = 0
function HardLeft () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 50)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
    basic.pause(200)
}
function HardRight () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 50)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
    basic.pause(200)
}
function avoid () {
    avoiding = 1
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 50)
    basic.pause(200)
    HardRight()
    while (avoiding == 1) {
        if (maqueen.Ultrasonic(PingUnit.Centimeters) < 15) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
        } else {
            SoftLeft()
        }
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 || maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            avoiding = 0
            HardRight()
        }
    }
}
function SoftRight () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 45)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
}
function SoftLeft () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 45)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
}
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
        avoid()
    }
    IRL = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
    Irr = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
    if (IRL == 0 && Irr == 0) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 80)
    } else if (IRL == 0) {
        SoftLeft()
    } else if (Irr == 0) {
        SoftRight()
    } else {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 80)
    }
})
