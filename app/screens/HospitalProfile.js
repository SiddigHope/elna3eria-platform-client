import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { colors, fonts } from '../config/vars';


export default class HospitalProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            about: 'من هو البروفسير سليمان صالح فضي   سليمان صالح فضيل من أشهر اختصاصيي الجهاز الهضمي والمناظير عالمياً، وأسهم في هذا المجال كثيراً، وتتلمذ على يديه عشرات من اختصاصيي المناظير.. لطيفٌ في تعامله، بسيطٌ.. إنجازاته تتحدث عنه.. لديه أكثر من (54) بحثاً في مجال علم المناظير نُشر معظمها عالميا.  ـ البروفيسور “سليمان صالح فضيل” من مواليد مدينة الفاشر، درس الابتدائية بتلس، والوسطى بالجنينة، والثانوي بالفاشر الثانوية، ثم جامعة الخرطوم كلية الطب، ومن ثم عمل بمستشفى الخرطوم، ثم التحق بكلية الطب جامعة الخرطوم قسم الباطنية 1972م، ذهب في بعثة دراسية إلى بريطانيا لنيل درجة التخصص في الطب الباطني 1974م–1978، ثم بدأ التخصص في أمراض الجهاز الهضمي.نال درجة الأطباء الملكية في الباطنية، وحصل على درجة الدكتوراه في الجهاز الهضمي من جامعة “برستول” ببريطانيا، تدرج في مجال الطب إلى أن نال درجة الأستاذية في جامعة الخرطوم ومستشفى سوبا ومستشفى ابن سينا، عمل عميداً لكلية الطب جامعة الخرطوم في 1992م-1994م، وعمل مديراً للمركز القومي للجهاز الهضمي بمستشفى ابن سينا 1995م-2003م. ويعد بروفيسور “سليمان صالح فضيل”صاحب مبادرات متفردة في مجال العمل الصحي والانساني ،وسبق ان تبرع بوحدة مناظير وعناية مكثفة لمستشفى الفاشر، وتَبرّعَ بالمالَ لبِناء عديد من المَدارِسِ في دارفور، ويحتفظ فضيل بموقع مميز وسط اطباء العالم وتم منحه أرفع جائزة عالمية فى مجال الجهاز الهضمى وهى شهادة التميز العليا وذلك فى الاجتماع العام للجمعية العالميه للجهاز الهضمي، وهو لقب يمنح  لعشرة علماء فقط علي نطاق العالم وذلك لإسهامهم في تطوير المعرفة في الجهاز الهضمي بفضل ابحاثهم ودراساتهم وجهدهم في اعداد الطلاب والعاملين في المجال .'
        };
    }


    render() {
        const { hospital } = this.props
        console.log("hospital")
        console.log(hospital)
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}
            >
                <View style={styles.banner}>
                    <Image source={require("../../assets/images/AC-recovery_herobanner_5_1700.jpg")} style={styles.bannerImage} />
                </View>
                <View style={styles.hospital}>
                    <View style={styles.hospitalImageContainer}>
                        <Image source={{ uri: hospital.image }} style={styles.hospitalImage} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.hospitalName}> {hospital.name} </Text>
                        <Text style={styles.hospitalEmail}> {"email@email.com"} </Text>
                    </View>
                </View>
                <View style={styles.aboutContainer}>
                    <Text style={[styles.label, { marginVertical: 20 }]}>
                        {"معلومات عامة"}
                    </Text>
                    <Text style={styles.about}>
                        {this.state.about}
                    </Text>
                    {/* <Text selectable style={styles.label}>
                        {"للتواصل"}
                    </Text> */}
                    <View style={styles.miniRow}>
                        <Text style={styles.contact}>{"الايميل : "}</Text>
                        <Text selectable style={styles.label}>
                            {"email@email.com"}
                        </Text>
                    </View>

                    <View style={styles.miniRow}>
                        <Text style={styles.contact}>{"رقم الهاتف : "}</Text>
                        <Text selectable style={styles.label}>
                            {"0123456789 - 0123456789"}
                        </Text>
                    </View>

                    <View style={styles.miniRow}>
                        <Text style={styles.contact}>{"العنوان : "}</Text>
                        <Text selectable style={styles.label}>
                            {"عنوان المستشفى"}
                        </Text>
                    </View>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    miniRow: {
        marginVertical: 5,
        flexDirection: "row-reverse",
        alignItems: 'center',
    },
    container: {
        // flex: 1,
        backgroundColor: colors.ebony,
    },
    header: {
        // position: "absolute",
    },
    banner: {
        width: "100%",
        height: 200,
    },
    bannerImage: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.softWhite
    },
    hospital: {
        // backgroundColor: "blue",
        marginTop: -30,
        flexDirection: "row-reverse",
        // alignItems: 'center',
        width: "90%",
        alignSelf: 'center'
    },
    textContainer: {
        marginHorizontal: 10,
        // backgroundColor: "red",
        justifyContent: "flex-end",
        paddingBottom: 10
    },
    hospitalName: {
        textAlign: "right",
        fontFamily: fonts.tajawalB,
        fontSize: 14,
        lineHeight: 20,
        color: colors.softWhite,
    },
    hospitalEmail: {
        textAlign: "right",
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        lineHeight: 20,
        color: colors.softWhite,
    },
    hospitalImageContainer: {
        width: 85,
        height: 85,
        borderRadius: 50,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    hospitalImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },

    aboutContainer: {
        width: "90%",
        alignSelf: "center",
        marginBottom: 20,
    },
    about: {
        textAlign: "justify",
        fontFamily: fonts.tajawalR,
        lineHeight: 20,
        color: colors.whiteF7,
    },
    label: {
        textAlign: "right",
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        lineHeight: 20,
        color: colors.softWhite,
        // marginVertical: 20
    },
    contact: {
        textAlign: "right",
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        // lineHeight: 30,
        color: colors.grey
    }
})
