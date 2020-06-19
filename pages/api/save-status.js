import { db } from '../../lib/db';
import admin from 'firebase-admin';
import auth0 from '../../lib/auth0';

const saveStatus = async (request, response) => {
    const session = await auth0.getSession(request)
    if (session) {
        const dados = request.body;
        const today = new Date();
        const currentDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
        await db
            .collection('markers')
            .doc(currentDate)
            .collection('checks')
            .doc(session.user.sub)
            .set({
                user:session.user.sub,
                status: dados.status,
                coordinates: new admin.firestore.GeoPoint(dados.coords.lat, dados.coords.long)
            })
        console.log(request.body)
        response.send({ ok: true })

    }
    console.log(session)

}

export default saveStatus;