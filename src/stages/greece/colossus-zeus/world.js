const COL_G = {cols:127,rows:247,s:0.12146,fr:[0.475,1.950],kr:[-1.275,-0.619],pal:[0xfcf3c7,0xf6e39d,0xe9cd7d,0xd3c4a6,0xceae5f,0xbaac91,0xba9544,0xa28e69,0x9b7b3c,0x916a24,0x806c4b,0x796039,0x7a571d,0x6c5428,0x60512c,0x6b4716,0x60471e,0x5b4a21,0x5b431c,0x584926,0x58471b,0x57411a,0x524826,0x514421,0x504220,0x52401c,0x4b3f1f,0x5f3a11,0x5e340c,0x573611,0x523b1b,0x523a12,0x52320e,0x4b3a1e,0x4b3914,0x4b3313,0x43371b,0x413116,0x532c0a,0x4e2b09,0x4a2a0a,0x432a0e,0x372a13,0x462407,0x3e240a,0x33230f,0x331e0a,0x251305],
 c:['..............................lwLLKLLLJPPLLLQQ.................................................................................',
'............................hklqBGGGGGGGFEEEEIQ................................................................................',
'...........................hhiijmppBGGGFvvvsrrHLKL.............................................................................',
'..........................kheeegjpBDGGGFFFEvvvzAyH.............................................................................',
'..........................kecceimBMMGNOOGJJIJJJKyw.............................................................................',
'.........................kebceimCNROORRROOJJPSUSKH.............................................................................',
'.........................hccgjmCNRSSRSSSPOJPSUUUTLw............................................................................',
'.........................ffgjpGRSSUUUUSPJPPSUUUUUQw............................................................................',
'.........................fhkmBOUVVVUUSPLSSUUUSSTTQo............................................................................',
'.........................fknqGRUUUUSLJPUUVVUUUUUTQof...........................................................................',
'..........................kqGRSPLJJJHLUVVVVVUVVVUQwhf...fk.....................................................................',
'..........................hqOROEEFFDJPUVVVVVVVVVVohkh..dfoo....................................................................',
'..........................foJJJDBDBBGRSUVVVVVV..KhfhkhffhHKw...................................................................',
'.........................dhossDGDDCCGOPTTUVVUV...ddfkkkkyLQQQQQQQ..............................................................',
'.......................hhknvqqDNMMMMMOPQQTTTUTQ..dddkwHLQLQTTTTTTQ.............................................................',
'.....................owyyEEvsvGGMGMMOOJLTTTTQwl...ddkHPSJHLTTTUVUTQKK..........................................................',
'....................KLLJJJFvsnnnnnllootHQQKwkh....kkySPsqEPTQQTUUTTQLk.........................................................',
'..................QKHHLPPPskhfffffffffhkkkkff.....HQUJnkhqPQKKKLQQLQTwk........................................................',
'................LKKKHHLHtkhfdddddddddddddd........lLolnihnSLLQQQLKHLQQHow......................................................',
'...............QKAHKLKyohfddddd...................hwhipjiDSSQQTTLIHHKSPKw......................................................',
'.............QQKAAHIHwkh..........................oAhlpilBJPQUUQKHyxzPSLo......................................................',
'...........TTQKAAyAAokf.........................HKHxolmipNJKLQTLAxyxrvIIwh.....................................................',
'.......QTTTTQKAAyAAok..........................hkxsnBngglFJHHKLIywtxruuAHo.....................................................',
'..kw..QTVTTQKAyyywoh...........................dfhlnBleciGJHAAIAxttxruuITQ.....................................................',
'.hoKQQQTTQKAwxAKAoh............................dfhllpmgeivFEyAIzxtttrruITQ.....................................................',
'.ktIKKLQLKAwttyyokf............................hkhillmjglDJEyzIzuwttoruHU......................................................',
'fhsFIIKLKKAywwyokf.............................wthfilljgiqvEzzuurtttoruxQ......................................................',
'fhqBFFIIIzyxxyAlf..............................klhdhijmjlqqtzIzurottorrtA......................................................',
'fkpBpqvFvvurxAwhf...............................fhdhijjjmsqtyzzutootrrrtw......................................................',
'fhmCCBBBBvvurytfd...............................fhhhjjjlpBvzzEIzttotrrrww......................................................',
'fhmBCCCCBBvuuwwkf...............................hkiiljmpMNJHHJPIAwtttorxw......................................................',
'fhlpCCCCBBvruwwwk...............................kkhilmpCNRSSPPPPIywwuuvAA......................................................',
'.fknpCCCBFuruxtHwo..............................khhilpCCpMUUUUSPJIAAzvvyA......................................................',
'.fhnpCCBBDFruuryAAwl............................dffklpCpmBRVUUSSPLKHzrrow......................................................',
'..hlppCCCCBvvvvvyAAHw............................dfhilBCCCRSSPPJIIHIzrto.......................................................',
'..fknpBCCCBDDFFvzzxywwo..........................ddffehlBMMOJIFFEEHKIyAw.......................................................',
'..dhlppCCCCCDDDvvuuwtoHw..........................ddddbcipCDEEvzzzHKKKK........................................................',
'..dfknppCCCCCDDDvuurotAAAl........................ffdbabemBqqsuvzzHHKL.........................................................',
'...dhlppCCCCBBBDFvrootwwwwk........................fdbabejBBqqrrvEHAHK.........................................................',
'...dfkppCCCCBBBGFvqnorurwwwk........................fbbbemBDFvurzIAwAw.........................................................',
'....dflpCCCCCCDGFvsqrrvuruwwh.......................fbabgmpDGGFFEHAww..........................................................',
'.....dhnpCCCCMGGGDFFsvvuuvtwohf.....................dbacgjpBFIIIIzxwl..........................................................',
'.....dflqCCCCCGDGGNGDvFFvvstEyAKK...................dbbcgjpsEAyAIIywk..........................................................',
'......dhnBCCCCCDDGNMGDDFFFssxyKQTT................dfdbbcgjpvEHAyIAwwo..........................................................',
'.......dkqBBCCCBDGMNNGGGDFFvuxwKQQT.......khffhhhhkkhbcgjmpDJLKAAAyww..........................................................',
'........fksBCCCCBDMNMDDNGGGFvztyLQTT....QQKwotwwtttniegjpCCNSUTQQQLKK..........................................................',
'........dhnDCCCCBBGGGBBGGGNGvurxKLQQQ..QTTQLKKHytEEqmiijpCMNPUUUUUTT...........................................................',
'.........dhoGCMCCBCCCBDGGMGNFvuuILLQQTTTTTTQQQLLHJGBpjjmpCBDOSUUVTT............................................................',
'..........dhoDMCBBBCBCNNMMMNGFvvIIHKQTTTTUUUTTTQPPOGBppCCCBBGSUTT..............................................................',
'..........ddhtDMCBBBBMRMDDGMMDvsvsxHQTTTTUUUTTTTQPJGDBCCMCBBDPUT...............................................................',
'...........ddhoDMMMCBMMBBBBCMGBssqrzQQTTTTTTTTTTTQLJJGMMMCBBDPSQ...............................................................',
'............adhoGMMMMMCBBBBBCMCBsqqvLQQQTTTTTTTTQLPPPOONMCBBDPQQ.................QQQTQQ........................................',
'.............ddhtJJGMMMBBBBBCCCBBppvJQTTTTTTTTTTQPPSPPPPOGDDJLQQT.............KKKQQQQQQKK......................................',
'...............dflEJJOODBBBBBCCCBppvPQTTTQQQTTTTQQSSSSPPJJJJJLQTT.......QQLKKAAAKKKLLQKKKK.....................................',
'................ddkEJPRGDDBBBBCCDsqDPSSTTQQQQQQQQQQTTTQLJJJEEJQTT.....QQQQKAAwwwyAHHKLKHHAw....................................',
'.................ddhoHPJJGCCBBCGGBBGGGFFFIIIKLLQQQTTTTQQLJEEELTTTTTQQQLLLKAxwtootxyzEEyyEzxw...................................',
'...................dfktKLJNMGGMNOMGnhiijmpBBDJJLTTTUUTTQLJzzIPQTTTQQLKKKKAywrooorrrzEEzvFFzto..................................',
'.....................dfkKHJOORRRRNDhccgijjmppBBFSTTTUUTQHyxEJLQQQQLKAAxxxxxrronooorIJPJGGFvrto.................................',
'.......................dhktPPSRRRNBhbbceggijmppBJPQTTTQKyxEzEILQLKKywwtrrrrrrrorrrISSPJGGGGFAw.................................',
'.........................dhoHJORRNCibbbbceggijmpDJQQQQKxwHJEEILLKAAurrrrrrrrrrrruESUUPJJNOOJHyw................................',
'..........................dfkHJNMCBidaabbccegijmpFJLLHxtHLIEEILKAAzururrrrqrrrorEPUUUPJJOOOOJHw................................',
'............................fktFCpmjebbbbbccegijmpFFzroxLLHLLKLKAAurrrrrrqqrrrryLUVVVUSOORROJHxw...............................',
'............................dfhopmjigecbbbbceggjmmBpnnrPQKKKKKLLKyrorrrrrrqrrotKUVVVVVSJJOPJFvstw..............................',
'.............................dfknjggggecbbbceggjjmpmnoISLLKKLLLLKyrorruurrqrrrzQVVV.VVVPJJPIzrrtw..............................',
'..............................dfkiggggecbbbbceggjjmlnvPJzxALLLLLKAvrruuuuuuurrITVV...VVULJJIzrrtw..............................',
'................................fhgegggebbabbcegijjlqIIHzrtyHKHHHIEuuuuuuuuuuyKQVV....VVQHIIzrrtw..............................',
'................................fhhegggcbaaabeggijjnFIEzvurrEHHHIIIvuuuuuuuuuyHQVV.....VQHAIIxuAA..............................',
'.................................fhgggecbaaacegiiijBGIzrrrrvIIIIIJIzvzvuuuvvzxHQV.......TKHIAxzILA.............................',
'.................................dhhggecbaabcegggimBFvunnnnuFIIIIIIzzzvuuvvvxxHQV.......VQKJEzEILK.............................',
'.................................dfhggecbaabcegggjmqvurnlnnqvFIIIIEEzzvvvvvvxxHQ........VTKIEzFIIA.............................',
'.................................dfhhgecbaabceeegjmpsqnlllnqvFEFFFEIEEzvvvvzxxHQ........VTHEEEEFII.............................',
'..................................dhhgeccbabceeegjmpqqnmjlmqvvvvvzzEIFvuuvzzyyKT........VUHyvvvvzAA............................',
'...................................fhheccbbbcccegjmpppmmjmmquuruuvuuFFFuuuxyAALT........VVLHzvFFzIIK...........................',
'....................................hheecbbbcccegjmmppmmmmnqqrrruurruuuurrxyAKQU........VVQHEFFFzzIL...........................',
'....................................fheecbccbcccgjjmnpmmmmpqquuuuurruuurrrxAKLUV.......TVVUJEFFFEzzAA..........................',
'.....................................fhgeccbccccgjmmnnmmmnqquvvvurrruuurrryILQUV.......KTVUPFFGFIEzxw..........................',
'.....................................fhgecbbccbceimmnnnmnpuuvIIzvsuuvuurrzAILUV........wQUVSGFGJJEzxwo.........................',
'......................................hgecbbcbbceijmnnnnnqvvEEzzvvvvvuurrzAHLUV........oKQUUOJJOJEvsxw.........................',
'......................................hgcbbcbabbegjmqqqnnquzzzzvvFEvvuuurrxALUU.........wLUUSRPPJFsqzxw........................',
'......................................hecccdaabbegjmqqqqquzzAyzEvFEzvuuurrxAQT..........wAQUUSSPOGssvzw........................',
'.....................................fheceeaaabcegjmquruuuIIIAzIvvvvvuuuurtAQT...........wKSUUSPOFsvvvw........................',
'.....................................hgeegdaaabceijnquuuuzIPPLIIEvvvuuuurrtyLT............APUUSPJEsssuw........................',
'....................................hiiggeaaaabcgjmnquxxxALPQPLIIzvvuuuurrtyL.............wKPUUSJEvvuAA........................',
'....................................hkiigbaaaabcgjmnqvutxHLQPLLIzzvvvquuurtAQ..............HJUUULHEIIKK........................',
'.....................................kiicbaaaabegjmpvFutyILPLKIzzuuvvruuurtAQ..............wySUUQLLQTQK........................',
'.....................................kkecbaaaabcgjmpFFvtHLLPKHAzzuuuuruuurtAQ...............wHQTTTTUUTQ........................',
'.....................................kkcbbaaaabcgjmpFFqrzLLPKIAzuuuuuuuurrtyL...............oAQVVVVVTTTK.......................',
'......................................hcbbaaaaacgjjpBuqrzILPLAzIzvuuuuuurtowK................KUVVVVTTQQKw......................',
'......................................fdbaaaaaacgijmppqquIIIAyzzuvuuuruurtotA..................VVUTTQLKHw......................',
'......................................fdbaaaaaabegijmnqnrzzAxxxuuurrrrruuttwA...................TTTQQKHAAw.....................',
'......................................fbbaaaaaabegijmmnquzzzxtrrurrorrrIPLLKK..................QQQKHHHAAHA.....................',
'.......................................aaaaaaaabegijmmnqvvuurrurrrooorrzIILQLQ................QQLKywyHHHIH.....................',
'.......................................aaaaaaaabcgjjjmpvFvuuruuurrorooootttLLwQ.............QKKLKHwtxzIIEyw....................',
'.......................................aaaaaaaabcgjjjmpqvvvuuuurrrrrorrrtttLHkKKA..........QKAwyIIxtttzzxww....................',
'.....................................faaaaaaaaabcgijjmnpuvvuuuuuuuuquvvurrESQoKHAAAA.....QQKAwttILzxttrrryA....................',
'....................................lhbaaaaaaaabcgijjmmpuuurrrruuuqlllnqFFIPPHyyAAAAwKKKKKKAwwxtIPIzurrrvyw....................',
'...................................KyhbaaaaaaaabceijjmmpqqqqqnqqqnpihhinFFFIEEsvzzzIAHLTKAAwowxrzSIzurrrvtw....................',
'...................................HEhcbaaaaaabbcgjjmmmpqqqqnnqqnqpmmnnBNOOJJJJFFFIIIJSULAxottrruPLzurrrvxx....................',
'....................................khebbaaaabbccgijmmppqqqqqnqqqnjiiknBORRRROOGJJPJLLTVTAwtttrrrJPIzrrrvxyw...................',
'.....................................hecbaaabbbceggjmmppuuqqqqqqppmjjlknGGGGDDGGOPPPQTVVVKwwxurooASJxtotttyA...................',
'.....................................hhecbbbbbcceggjjmppvFssqqpppppjiknBNGMGDGGOPPSTTVVVVQKAyurootSLytttxxAA...................',
'.....................................hhecbbbbccceggjjmpqvFssqqBBBCCCplklGRRRRROORPSUUVVVVTKKIzrrooQLyytxzAAA...................',
'.....................................hheebbbccceeggjjmnqqssqqqBBDGNRRMnnGOROOONNNPSUUVVVVQKJPItoooLPAAyAHIAK...................',
'.....................................oiecbbbbcceeggijjmpqqqqqssvDNRRRRGqqOROPPOJJJLTTUVVVQKIPPzoooIPIAyyAAAK...................',
'....................................onjecbbbbcceeggijmmppqqqqssFGRSSRSUSESSSSSPPPPQUVVVVVQHEJPIxtoISIyxxxxAK...................',
'...................................hlijjebbbbccceggijmmpqqqssvFJOSSSSUUUUUUUUUUUUUVVV...VQHzIIEytoASIyxxyzAL...................',
'..................................dhigijjgccccccegijjmmpvuvFvFJPPPPPSSSUUUUVVVVVVTV.....VQyzEEzyxtxPIyxxyyAK...................',
'.................................ddkiggjjjigecccegijmppBFFFFFJPPJHHJPLLPSSUUUVVVUTV.....UKtzIIEyyxxPLAyxwwxAk..................',
'.................................dfkgegijjjjjjggggjmppuvIIIJIJJIEEEJLHHHLPSTUUUVTQ......oktEJJIHHIALIAyxtttwk..................',
'.................................dfieeeggjjmmmmjjmppuvFFIIIJJIEzzzIJLIxyILLPQTUUQQ......hhtIJJIKIIHIHxwxxttw...................',
'.................................dfhcceeggijjjmmmmmnnruvxzzIIIEzzzIIIzxxzIILLPSSLQ......fhtIJJIHAAyAIytttttw...................',
'.................................dhebccceegggijmmmjlnnqursrzIIIIIIIIIzuzzzzIILPLKQ......dftIIIzxtttyIAtotttw...................',
'.................................dhebbbcceeeggjmjjjlnnpqquqvFFJJIIIIIzzzzxxzIILKLT......dfoIvvrtrrryHxtotttwk..................',
'................................dfkfbbbbcceggijmjjjmnnpqqqqFFFJPJJJIIIIzzxxzAIIHLTV.....dfouurrxuzzyHwtwtttwk..................',
'................................dfkfaabbccegijjjjjjnnnpqqquFFIIPSPJIzzzxxxxzAIyALQU.....ddlruuzIzzuxHyxxxtwwk..................',
'................................dhkdaabbccegijjijjlnnnnqqqsvJJJPSPJIIIztwxAAIIzHPQT.....dfluFzEEuzrtHAxwtxyAl..................',
'................................fkhaabbcceggjjjjjmmnnnqqqqvFOPPSSPJIIAytxAAAIIILPQQ.....dhovFvzzzzutHyxwtxAAo..................',
'...............................fhhdaabbceggijjjjmmnqqqqqqvFORPPPPLJAzAAxyIAyAALPPSTQ....dhovvvzEzurtHAyxxyAAo..................',
'...............................fffaaabccegiijjjmmmpqqqssvFFOPPJJPPIyyAAAAKAxAHLJJSTQ....dhoruvzxurrtAHyyyAAAo..................',
'...............................fdaaaabceegijjmmmppqqqqssvFFOOPJJPLHyxAAAAKAAKLIvJPUT....dhoruvrturrtAHyyzAAAw..................',
'...............................dbaaaabceggjjmmppppqqqqqqsFGRRPPPPIyxxAKKKAAKLPyrEPUUQ...dkoorvutuuutyAwxyAyAw..................',
'...............................daaaabcegggjjmmmmmpsssqqsFJOSPPPPPExxxAKKKAAKSLxsELQUT...dkoorvuruurtxytwxyxAw..................',
'..............................fdaaaabceggjjmmpmmnqBBsvBGOPPSPPPPJEyxxAAHHyAQSIzvEJQTV...dkoorvvuurrrzytttyxAw..................',
'..............................daaaaabcegijmmppppBDGDBBBGOOPSPPPJEExwxAKHAyKTLzzzEJQUUQ.fdkoruvzuurruzyttxyyAw..................',
'..............................daaaaabcegjjmpBBBCNNNGGDDGNGOOPPPIEywwAAKKALPPzuzzzJQTTT.hfkoruuvuuruuxzxtxzHAw..................',
'.............................fdaaaabccegjjmpBBCMNMMGGGDGGGOOPPIIHyxxyHKKLSPHurzzEJQTTT.kfkororvuuvuurzzxzEHywk.................',
'.............................daaaaabceggijjmpCCMMDGMNGDGGFGJJIzyAyyyyHLPSUJzuruvILQQTT.whktroruuvvuuuzzyEzAAAk.................',
'............................fdaaaabcceggjjjmpBMMCDGGMGDDFFGIIzxxyyzHHKPUUSJEuruvILPQQTTKklorqsvvvFzuxzyzzxyHHk.................',
'............................daaaabbceggjjjjmmppBBBDDDDBFFvvvFzxxzzIJLLUUSPFvrrruIJLQQTTQwoorqsFvvvzzzyxxxxxHHk.................',
'............................daaaabceggijjjjjmppmpBssqqquuurruvzzzIILSUUUPJvsrrrrzJPQQUVVKwsqqsFvuuuzzzzyyzxHAl.................',
'...........................daaaaabceggijjjjjmmpppuqnnnqqorrorvzFIJPSUUUSJEsqooorvIQTTTVVLxzvssvvqrruzzzzzEzHAod................',
'...........................daaaaabceggjjjjjjmmmppnnnnnqnnnnouFJIJPSUUUURGsqqqrrorIQTTTVVQxvFvqsvururrxEzxEzxAwf................',
'...........................daaaabceggijjjjjjmmmmpnnnnnnnnqsFGGOFJSUVVUSNDpppuuqqrzLUVVVVQyEFsqsvuuroosEEyHHwAwf................',
'...........................daaaabceggijjjjjmmmmmmmpppquqqBGNOJJPUVVVUURDBBBpFFuqrvLUVVVVTAIFqqsvvuuoovEEHHHyAAf................',
'..........................fbaaabbcegijjjjjjjmmmpppppBBFFDDGOPPTVVVVVUSODqBBDFFFFsvPVVVVVTAIFqqvvvuuooxIHHKHAKAf................',
'..........................fbbbbbceggjjmmmmmmmppBBBBBBGNNGGJPSUVV..VVUSODsBBDFFFFvzPVVVVVTyEEvvvvFurorEJJLLHAKAh................',
'..........................fecccceggjjmmppmpppppBBBCCGGGNPSUVVVV....VUSJDBBBDBDDFFEPUVVVVQyEEFFvvFuotLTPLLKHAKAh................',
'..........................hgggggijjmmpCCBBBBBBCCDGGGOOOPVVVVV......VUSODssBBBDDDDFPUVVVVLyEEFFEsuzxKUVULKKHyAA.................',
'..........................hggijjmmppBCMMMMMNGGOOOPPSSTTUVVV.........VURGDBBBDDDDDGPUVVVVHtEFFFvrywkoTUTLLKHwxw.................',
'..........................feceimpCCMMNNNNNRRSUUUVVVVVVVV............VUSNGBBBBDDDDGPSUVVUtoFFFFvstkfkQTLLLIHwww.................',
'..........................fecegjpBBCMNOROOPSUVVVVVVV................VVSOGDDGGGMGGGJSUUTQooFFsqvzkddkTQLLLIywww.................',
'..........................feeeijpBBDGGNOOPPSUVVVVVV.................VVURGDGMNNNGGGJSUUQLosFGFsEofddkQQLKIIywwwl................',
'..........................feegjmCCGGOOORPPPTVVVV....................VVUSOGGMOOJOOOORSSSLsvGGJEyh...kKKJHIKytuxof...............',
'..........................feegjmCMMOOORRPPSUVVVV....................TVVUSONNOOOOOOORSSSPssFFIElf...kHHIIJIztuxtf...............',
'..........................fegjmpCNNRRRRRSSSUVVV.....................QVUUUSOORROOOOORSSSSEsDFIyh....lLLJIJIHxuxwf...............',
'.........................dfegjpCNNORRRRRRSSUVVV.....................KQUUUSSSRRROOOORRSSSJDDFEof....lLKIIIIExrtwh...............',
'.........................dfegjpCNOORRRRRSSSUVVV.....................KKTUUUSSRRONGGOORSSSPOJJHlf....oQLPJIEztrtth...............',
'.........................deegjmCNRORSRSSSSUUVVV......................KQTUUSSRROGGGNNRSSSSSPLKl.....oLKJFEEzrrtoh...............',
'.........................deggjpCNRRSSSSSSSSUUUTT......................LTUUUSRRONNNGGORSSSSSQQ.......KHIFFFzzrow................',
'.........................dhgijpBMRRSSSSSSSSTTQQQ......................LQQUUSRROONMGGNOPPSSUTT.......HHIJGFEzutw................',
'.........................dhgjmpBMRRSSSSSSSSQQLLL......................ALQSSSRRRONGGNOOPPPTTT........HIIJGFFIzww................',
'.........................fhgjmpCMNRRRRRRRSSPLKKK......................kHLSSSRRROONMNOOPPPSTT.......oKJFJJFEIIywl...............',
'.........................fhgjmpCCMNNNNNORRSPPJto.......................wKQSSRRROONNNNRRSSSTTT......oLJFJJEEEzyxo...............',
'.........................feijmpCCCMMNNMGORPPPJok.......................kHLUSRRRONNRNNRRSSSTTT......oHJGJIEEEzxyo...............',
'.........................fhijmpCCCCMMMMGNRPPPJlk........................oKSSSRRONORNNRRSSSTTT......otEGGFEEIIzAo...............',
'.........................fhijmpCCCCCMMMMNOOPPJlk........................hwKPPROOOORNRRRSSSTTT......ltEGGEvEIIEAw...............',
'..........................himppCCCMCCMMMNOOOPHlh........................flHKPRROOOOORRRSSSTTTQ.....ltEGFssEFIEAw...............',
'..........................himppBCMMCCMMMOONJJHo..........................hwKSSROOOORRRRSSSTTTQw....ltvFFssFFIIyw...............',
'..........................hijppCMMMMCCCMNOGDJHo..........................flKSSPPOOORRRRSSSTTTQK....ltvvsssFFFEtt...............',
'..........................hijpCCMNNMCBBGNONDDHk...........................hHPSSPOOOORRRSSSTTTQK...flxvssqqvFFEtw...............',
'..........................himpCMNNNGCBBGMNNGJH.............................oLSPPOOOOORRPSSTTTQK...fltvvvsqvvvEyw...............',
'..........................himpCMNNNGMCDGMNNOJo.............................hHPPPROONNOOOPPTTQQK...fltvBFsqsssvxy...............',
'..........................hijmBGNNNNMGDGMNMPK...............................oLPRRRRNMNNOPPTTQQK...fktvBBvvvssvxA...............',
'..........................fijmpDNNONDDDGMMGPA...............................kLSPRRRNNOOOPPTTTTLo..fktsBsvFFssvzH...............',
'..........................fhjmpMONOGDvEJGGJKo...............................fHQSSRRNOOOOPPQQTTLw..dkoqsBFFFssFEA...............',
'..........................fhimpMOONGDEIJJJJH.................................kQSSROOOOOOOPQQTTQw..fkossBvvvsvFzy...............',
'..........................fhijpMOOOGGGJPPPPH.................................hHQPPOOOOOOOJLQQTQK...kovBvvsvvvFzw...............',
'..........................fegjpDOROOGOPSPPQ...................................lLPPOOOOOOJJLQTTQK...kovBvvsvvvvzww..............',
'..........................fegjpDORRONORSPPL....................................KTSSOOOOOOJLQTTQK...ktvFsssvvsvvww..............',
'..........................feejpGNOOONRRPJJH....................................oTSSROONRRPPQTTTQ...ktEFqqrvvqqrww..............',
'..........................feejpCNNNNMNOJJJt.....................................LSSSRRRRRSLQTTTQ...htFFFEvvvsqsww..............',
'..........................fegmBCMNNMMNNMGEk.....................................wTTSSRRRRPJQTTTT..hhtIFFvvsvvvvxw..............',
'.........................feeipCCMNNGMMMMGth......................................QTSSRRRRPJPTTTTKAhfkHJEquusssssto.............',
'.........................fegjCMMNNNNMMMMJod......................................wTUSRRRRPPPSTTUQKkdhyHEFuussqqrto.............',
'.........................fgimCNRRNNNNMMNJkd.......................................QUSSSRRRPSSTTUTKlffoHEFuuqqqssto.............',
'.........................fgjpCNRRNMNMMMOJhd.......................................wUUUSSPORSSUTUULwhdhyEqqurqssstl.............',
'........................dfgipMRRRNNNMMGJofd.......................................kQUUSPPOORSSSUULAkdflxqquqqssvto.............',
'.......................ddfgipCNOOMMMGDDJkd.........................................lTTTPPOOOOPSSUTKofdhtqquqsvvFto.............',
'.......................ddegimCNMGGCCCGEofd...........................................QQSPOOOGGJSUUKwhdflvuuvFFFFxw.............',
'.......................ddegimCMGDDCCCGEhd.............................................QQSRONGDGRSULAofdkquuuvFvvrt.............',
'......................adcegjmCMDEDCCMDofd.............................................LQSRRNMGDGSULKwkfhnqqqqsvurok............',
'......................adcegmpMMDBBMMMGkd...............................................QQSRNNGDGRSQLwohhnrqqqsvvrto............',
'......................ddceimCMMGCCMMMEh.................................................QSRNNMDEOSSLwwohkruuusvFuto............',
'......................ddceimCNMMMMMMMEf.................................................QSRNNMDEGSSPAwwlknruvvFFuoo............',
'.....................ddbcejpCNMMMMMMDo..................................................KPRRNMDDGOSSLwtoknruvvvvuto............',
'.....................ddbcejpCMMMGGMDsk..................................................oLONMMDDGOSUQHttnouvvssuuto............',
'.....................ddbcgjpCMNMGGMDsk...................................................KONMCDGGJSUULytoorEvssvuto............',
'....................ddbcegmpCMNDGGGBEk...................................................HJNMCDGGFPUUUKytorIJEvvvto............',
'....................ddbcejpBBGDBGDDEHk...................................................wJMMCDGGGPSUUQIzrsJJEEFFxw............',
'....................ddbcgmCCBDBBGDDDHl...................................................oEGMDGGGGJPUUULEzEJJEFFIzw............',
'....................ddceimCCBGGMNNNGHo...................................................otDMGGMNNPPSVUPIEEJJJJFFxw............',
'....................dbcejpCGDGNORRRGHo...................................................koDMGGNNNJJSUUSLIHEJPJJFywo...........',
'....................dbcgjpMMMMNORRONJw...................................................ktvMMNOONGJPSUSLKHxtJJJIywo...........',
'....................dceimBMNNNNNNNNOJo...................................................ktvGNRNNGGOJPSQLKHHtEOJJHww...........',
'....................dcejmCMNONNNNNNNJl...................................................ktDCNNMGDDGFPSSLKHEssFGJEyw...........',
'....................dcgjpCGMNNNNNNMGvk...................................................htDCMNMDDDDEJPSPLHEsovFIzywk..........',
'...................ddegjBMDDMNNNNMDDqk...................................................hoEDMMDBBDDFJPPPLJIsovFFzywk..........',
'...................fceimCCDDGGNNGDDstk....................................................oEDDCBBDGDvEEJPJJErosFEzxwk..........',
'...................fcejmCCGDDDNNGMMDth....................................................kyFDBBBDGDsEJPPJIEsssJJzwwk..........',
'...................fcgjpCDGMDDDDMNGEth....................................................kHIGGDDDGDDGORRJEzzotJJEwwl..........',
'...................fegjpCDDGGDBDGMDEl......................................................wJJNGGGGDDGOOPJEttolHPHywo..........',
'..................dfeimpCDDDDMCCBDDEk.......................................................LJOGGNDBDNGOPJHtttktQLEyo..........',
'..................dfgjmpCCDDCCCCBBDEf.......................................................KLONNNGDNNNPJHHyEthkQLJvo..........',
'..................dfgjmBMMMMMCCCCBEof.......................................................wLPOOGDGGNGOJHEEHHhhwLJEw..........',
'..................dfgjpCMNNMCCCBBEEh.........................................................QPSODBDGGGJPJJJHHh..KKJw..........',
'..................dfgjpCMNNDBpBBBEof.........................................................KTPOFvDGMGJPPJEHwh...QL...........',
'..................dfgjCMMMGDBppBvEk...........................................................QQPJvBGGGGJJEEHw.................',
'..................dfgmCMMGGDppppvtf............................................................QSSGDDGDDFFtsxo.................',
'..................dfgmCMNDDBBBBBEk.............................................................LSSONDDDvvFvEyw.................',
'..................dfimCMJEvBCCCDEh.............................................................wLJOGDBGDDFFPJA.................',
'..................dfipCMJEvBBBBBk..............................................................hHJJvsBGMGFFJLH.................',
'..................fhjpMMGDDBBBpoh...............................................................kHHEsBDGGFFJLK.................',
'..................dhjBNNMMCCCBqkd................................................................oHEBBDFFFEFIK.................',
'..................dejpNNMMBBCBshd.................................................................AHDDDDFFvEEH.................',
'..................dhjBNNNMCBBBof..................................................................lKJDDDFFvFzHw................',
'.................ddgmCNNGMCBBvkd..................................................................hHJGDBBFFvuAA................',
'.................ddgmMRNGCBBDsh....................................................................lHJEBBFFFuzAf...............',
'.................ddemCNNMCBBDo......................................................................wHEvBDFFvzxh...............',
'..................dhmBGGGCCCFl......................................................................oHJvBBFFvzyh...............',
'...................hmBDDGMMGyk.......................................................................HHEBFFFFIyk...............',
'....................mBBBDMCDt........................................................................wHIFFEvuzyk...............',
'....................mBBBBDDE..........................................................................KJDBFEszAo...............',
'....................mBCGGGEH...........................................................................KsqvFEzAo...............',
'....................mCGGGGJH..........................................................................oHEqqFFzAw...............',
'....................mCGDDGL............................................................................AFvsFFvyAk..............',
'....................pDGGGJH............................................................................xEssvurxxl..............',
'...................iBGNGGJw............................................................................lEvsqqruxo..............',
'...................jCGNGGJk.............................................................................tEsqqrzyt..............',
'...................mCDDFvH..............................................................................kJvqnrrtt..............',
'...................mBEEEEo...............................................................................EFqnroow..............',
'...................mBEEEE................................................................................oIqnrrotk.............',
'..................hpDDEEy................................................................................lEqnqutol.............',
'..................huGBsEl................................................................................kqqnnvzoo.............',
'..................kvGBvyk.................................................................................oql.qEwok............',
'..................lFBBFy...................................................................................n..nJHyo............',
'..................oFDDEyk.....................................................................................nPPKw............',
'.........woooo...lFGGDJKw..........HHHK.....KK................................................................nOSLHk...........',
'......wAHKKLKLH.lIOGDFJKK........KKKKKKQKKwoookk..............................................................mNSTKok.....Iu...',
'.....IKHLLLLLHolwIFDDDJLQQKL....QHtwwooKQKokkkklH.............................................................jGRSKwo.h..uIIr..',
'.....IIyAHHJxnnrKLEvDGJLQQQQTT.QTwkllkkwQKokkkllot............................................................ipNPKAoolloruIou.',
'.....AxttzxolnsIKHzsDGJHLQQTTQQQLokkkkkoHKokkklkk..............................................................mGPLLAoottorun..',
'.....wsrrzonozIIHEzsEGJyHLHKLKKLHlkkkkklllkkkkkk...............................................................jCOLLAtoollll...',
'.....rvsqontEPJEzvsssEEEHKytxxzIElkkkkllkkkkkkh.................................................................CNLKHwtolllk...',
'.....nqqnnqFPPIsvvvvBDDvssonooruvlkkkkloolkkkkk.................................................................BNPKHwwtollk...',
'.....llnnqFOJFvrqvDDDDGqnnnnmmlnnlkkkklollkkkk..................................................................BNJKHwwtokk....',
'......nnsFGFvsrqqvDDDDGmjjjjjjiillkkkkoo.k.kk....................................................................DJKHywtok.....',
'...............................................................................................................................'],
 f:['..............................eiilortuutrpmifa.................................................................................',
'............................gfhjjlortvvutrojgca................................................................................',
'...........................glqqqpqrtvxyxwusojgcaaa.............................................................................',
'..........................gmxDCyvuuvxzzzyxurojgeda.............................................................................',
'..........................hvHLICxvuwyzAAzywuqlhgea.............................................................................',
'.........................gnAKKFzvuuwyzAAAAyvrnjeda.............................................................................',
'.........................huEFCyvttuwyzABBBzwsoiedcd............................................................................',
'.........................htzyvsqrsuwyzABAzwtqnjgdee............................................................................',
'.........................hqrpnmprsuwyAAzyvspmkiidfe............................................................................',
'.........................hkkhimoqsvyAAzwurolheddegij...........................................................................',
'..........................fieiloruxzAzwtpmjgdddddjpok...jg.....................................................................',
'..........................gidilosvxyywuqomiedbaadnxuk..knie....................................................................',
'..........................gieilostuvvtrqolidda..emzzojjoqjdc...................................................................',
'.........................hiheimoopqqqpoomlidda...kyHvqpolfdbaaaaa..............................................................',
'.......................fehhegjmllllllllljiiedcb..kqBAqljigddddddba.............................................................',
'.....................cbcdddgjjiiijjkkjiigedehge...kuupllmkgedddddbaab..........................................................',
'....................abdddegilmmmmnooonligfgjjh....gnnnqsurmiiiigddddcd.........................................................',
'..................aabddeddgmsvsrssttsrqonighj.....eijouCDyrooonkhfddeee........................................................',
'................aabddddddhmruwqkkkkkkkkjjj........eilszGIDvsssrpnmlieeecd......................................................',
'...............abdddeddddgikkkk...................ekpwBHIEyvvutsssrniedec......................................................',
'.............aabddedddff..........................dipwCGGDzyxwvwwxwtoieec......................................................',
'...........aabdddgddddg.........................dcdhnwEIHDBAAzyzABAxtngffe.....................................................',
'.......aaaabdddegdeee..........................fhhghnyINKECCCCCDEEDAwrlgfc.....................................................',
'..db..abdddddegiefff...........................hpolmrBMRNGDDEEEFGGEBxsmfda.....................................................',
'.eebaabddddfikkihjf............................hpttsvDNROHEEFFGGHHFCyskfba.....................................................',
'.eedddddgikmookikki............................emtxyzELPNHEEFGGHIHFCyslfa......................................................',
'gheeddegkoqssollki.............................cktABBDIMMIFFFGHIIIGDztlga......................................................',
'qmfgiijmpsuvspnoi..............................dhrBDCDGJJHGFGGHIJIGDztmgb......................................................',
'yqjjllnqtvywtqqrk...............................grACBCEGGFFFFGGIIIGDztmhb......................................................',
'yrkjloqtvxywtrrtk...............................gpwzzABCCCCDEEFGHHGDytmhb......................................................',
'rojgjmquxzyxurqqj...............................fmrvwxyyyyzABCDEFGECxslhc......................................................',
'hjjgilptwyyxuqnmg...............................dkpstttuvvwxyzABDDCAwrkgb......................................................',
'.glhgjnrvyyxuqmjgf..............................emqrqpqsuuuuvxyzAAzwtokgb......................................................',
'.hiigimquxyxvrnjhfde............................glqrqqqsuutuvwxyyywuqmiec......................................................',
'..gjhimqtxyxvtqmigged............................isvvvvvuutuwyzzywtqnkhc.......................................................',
'..hmjjmpsvyxwuspmjhgdcd..........................jowCFGDzwvwzAAAyvrnihed.......................................................',
'..iomkloruwxxwusqoligfdc..........................jxHMONHAxyBCCByvqkgdc........................................................',
'..jmnkknpruxyywvutqnkhfdce........................jqBHMPOEAACDCByvqjgb.........................................................',
'...ipmkkmpswzzyxxwvtrmhfffe........................kqBKOQGAACCCAxtokhc.........................................................',
'...jmnjhjnquxzzzyyyxvrmihggg........................kyJNQGAzBBBzwsnkgf.........................................................',
'....ikkhilnruxzAAAAzxurolhihh.......................kyJNPGAzAAAyvrnkf..........................................................',
'.....hnjhjlosvyAAAAAzxuspljjigi.....................kyJNPGBAAAzyvsomh..........................................................',
'.....jllggjlptwzAAAAzyxvspmkjkhdd...................kyJNOHCBAAAyvspnh..........................................................',
'......ijiegjnrvxzAAAAAzxvtqnlkhfca................kkqBKOMFCBzyyxwtpmg..........................................................',
'.......hhheilpswyzAABBAyxvtrqnkgdba.......fghhhhggltAHMOIDBzxvutsqolf..........................................................',
'........gkggjlpuxzzABCBAyxvvusqmgdba....aaejkkkkkklsBJMJEBzwusqomljfd..........................................................',
'........ikjegjmrvxyABCCBAyyxxxwrmheca..abdeghhhiiikqzGIHDBzwspmjihec...........................................................',
'.........ijieilnruwyABCBBAzzzAzwsnigcaabddegijjkllnryDFFDCzwsnjiecc............................................................',
'..........hnjgjlnquwyAABCCBBBBBzwtpkhfeeegijmmnnopruyCDDDCBytnjfc..............................................................',
'..........jnpjgijlptwxyACDDCCCDCAyvqlihhikmnpqqrstuwzBCDDDCzvojd...............................................................',
'...........knpkfgjlosuwzBDDDDDEEDCzvqnmmnoprstuuvwxzBCDDDDDAwqkd...............................................................',
'............knojegjlmptwzBCDDDEEEECyurqqqrsuvwwxyzABCDEEEEDBxrld.................bbbaaa........................................',
'.............kikjegijlosvyABCCDEFFDAwussstvwxxyzABBCDDEEFEEBxsmhd.............dddfhgggdbb......................................',
'...............iklhegijmqtwyzABDEEDAxvutuvwxyzzABBCCDEEFFFECzupkd.......dddeeeimllmmlkihec.....................................',
'................jlmhdegikoruwxyzBCCBzxwwwwxyzAAABBCCCDEFGGGEBwqkd.....ddhlmnnoqttstusqnljfc....................................',
'.................jijjfdegikortuvwyBDFFDBAzzAAABAAABBBCEGHIHGCxrlgdddeehlnrtuvwyzAzzAywurmjfd...................................',
'...................igihfdegjlmopruAJPROJGDCCBBBAAAAABCEGHJIHDytolkllmnosuwzABCEFGFEDBzyuqmkgd..................................',
'.....................ighhedgijlnprAOZZZTOKHFDDCBAzzzABEGIKJHEAwtqqrstuwyABEFGHIIJIFDBBzxtpljfd.................................',
'.......................hghheegjloqzPYZZZXSOLIFECAzzzACFIJKJIFCzxwwxzAABDEGHIJKKKIEByxyAzvsolic.................................',
'.........................hjiedgjmpvLXYZZZZWRNJGDBAAACEGJKJJIHECBBBCDEFFGIJKLLMKIEzvstvxzyuqlifc................................',
'..........................iggeeilmrGWXYZZZZXSNJFDBBBDGIJJIIIHGEEEFGHHIIJKLMNMKIFztomorvyywrnjhc................................',
'............................gkfgijpAOWYZZZZZVQLHEDCDGIIIHHHHHGFFGHJJKKKKLMNMLJFAunjhjnsvxxuqlifd...............................',
'............................ikkfegnwGRXYZZZZYSNJGEEFHIHGFGHHGGGGHJKLLLLLMNMLKHCwojebejnsvxwtpljfd..............................',
'.............................ijjfgnuBIRYZZZZZUPLIGGHIHFEFGHHGGGGHJLMMMMMMMLKJFAskeb.bekotvxwtqmjd..............................',
'..............................hfgintxCKTYZZZZWRMJHHHHFEEGHIHHGGHIJLMMMMMLLKJHEyqic...bfkptvxxtojd..............................',
'................................ekoruyFPYZZZZXRNKIHGEDDEGIJIHHHHIIKLLLLLLKJIFCwpic....bfmquwyuojd..............................',
'................................gimorvDNYZZZZVQLJIGECBDFIJKJIHHHHIJKLLLLKJIGEAumfb.....cgnswyunic..............................',
'.................................flmpuCNXYZZZTNKJHEBABDHJKKJIHHHHHIJKKKKJIHFCyslc.......dlrvyuoied.............................',
'.................................fllouBLVXYZXQMKJGDAzBEILMLJIHHHHHIJJKKKJIGDAwohc.......ckqvyvqkgc.............................',
'.................................gllmqzISWYZUPMLJFBzzCFKMNMKIHHHHHIIJJKJJHFDzumd........cjqvzxskgc.............................',
'.................................gikjnvFPVXYUQOMJFBzzCGLOONKJIIIIIIIJJJJIHFCzumd........bipwzyslhb.............................',
'..................................fgiksCMUWXUSROJEBzACGLOONLJJJJJJJJJJJJIHFCyslc........bipwAzunieb............................',
'...................................efjqzJQVWVUTPKEAzACGLNOMLKJKKKKKKJJJJJHEBwqjc........bhnvzAvqlhdc...........................',
'....................................dinvEMSUVVURLFBzADGKMMMKKKKKKKLLKKKJIGEAvoib........bgmtyAxtpkgb...........................',
'....................................egkqAIOSUWVSMFBAADGJLLKKJJJKKLLLLKKJIFCxrlgb.......cdgksxAyvrmhec..........................',
'.....................................dimuDLQUWXUNGBABDGIKKJJIIJJKLLLLKKJHEAunhdb.......dghlrwAzwsokhc..........................',
'.....................................dfjrBKPTXYWPHCABDGIJJIIHIIJJKKKKKJIGDyskfa........ehhkpvzzxurmifd.........................',
'......................................cirBKPUXZYRJDAACFHIIHHHHIIJJJJJJIHFBwpjea........ffghmsvyxvsplic.........................',
'......................................djsCJQWXZZSKEAABEGHHHHHHIIJJJJJIIGEAunhca.........dhhjnrvxwusnifd........................',
'......................................dksBIQWXZZSKDAzADFGGGGGHIIIIJJIIHFDAumfa..........efggjoswxwtpkhc........................',
'.....................................dfkqzISWYZZRICzyACEFFFEFGHIIJJJIHGECyslfa...........deghmquyywslhc........................',
'.....................................bgjqzKUWYZWOGByyzBDEEEDDEGHIJJJIHGDAwqjdb............cggjotxywsmhc........................',
'....................................ccdhqCOVXYZULEzxxyADEEDCDEFGIJJJIHFDAvpib.............deghmrwywslhb........................',
'....................................abdgsFRWYZZSJCywwyACDDCCDEFHIJJJJHFCzvoib..............cghkpuxvqkgb........................',
'.....................................adgvITVXYZRIBxvvxACDDCCDFGHIJJJJHFCzuoib..............efhinqtsnhfb........................',
'.....................................adjxJSUWYZRIBwuuwACDCCCEFHIJJKJJHFCzuoic...............diiilnqlgea........................',
'.....................................ackyJRUWYZSJBwuuxACDCCDEGHIJJKJJHFCzvpic...............eggggjmlgecb.......................',
'......................................cmzJQUWXZTKCywwyBDDCCDFGHIJJJJJHFCzvpjc................dbdfgjnjgfdb......................',
'......................................doBKQTVXYULEAyxzBDDDDEGHIIJJJKJHFCzvpjc..................bdginolhgb......................',
'......................................fqBJPSUWYVNGCAzACDEEEFHIJJJKKKJIFCytojc...................bhkpspkhec.....................',
'......................................fmxIORUWYWPIDBABCDDEFGIJJJKKLLKIFBxsmic..................cfkosvsnigc.....................',
'.......................................iwINRUWXXQJEBBBCCDEFHIJJJKLLLKJGCytnifc................cgkotwyvqjfb.....................',
'.......................................jxJNRUWXYRKEBBBCCCDFGIIJJKLLLLJHEAwrmjfc.............cdgmptxABxrkged....................',
'.......................................jyJNRUWXYSKECBCCCCDFGHIIJJKLLLJIFDzvqnlgdd..........cglnqtwzCDzuoigc....................',
'.....................................ehpBKORUWYZSLFCCCCCDDFGHIIJJKLMNMJHEBxtrolkgdee.....ccgmruvwyBDEBwqjgc....................',
'....................................afqzHMPSUWYZTLFCCDDDDEGHIJJJKLNQSROJFCzwusqpmllhdddddgknsxzzzzBEEBxrkgc....................',
'...................................abguGMORTVXYYTLFCCCDDEFGIJKKKLMPTVVRLGDByxwvurqpmlkjjkmrvyBDDCBCEDBxrkgc....................',
'...................................abfsGPRTVWYZYSLFCBCCDDFHIKKLLMNQUWVRMGDBAzzzxwvtrpommosxADEGGFDDEDBxrkgb....................',
'....................................adnALRUWXYZXSMGCBBBCDEGIJKLLMORUWVRMHEDCCCBAzywvtsqpswAEGHIJIFEDDBxslgdd...................',
'.....................................clwHPUWXZYVRMHECBBCCEGIJKKLLNQUWVSNJGFFFFEDCBzxwussuyDGHJKLKHEDDBytnhfc...................',
'.....................................dksDNTWXXWUQMIFDCBCCEFHJJKKKLNRTUTPKHGGHHGFDCAywtrrtyCGIJLMMJFDDCzuohfc...................',
'.....................................ciqBLSVWWVTQMJGEDCCDEGHJJJJIIJLORSPLIHHHGFECAyvsqonquzCFILNNKGDDCytngec...................',
'.....................................bhpBMTVWWVTQNKIGEEDEFGIJJJIHGGGJMOOLIHGGFEDBzwsomkjmrwADGJMNKGDCBytmfeb...................',
'.....................................aenBNUWXXWUROLJHGFFFGHIJJJIGFEEFHJLKIGGFEDBzwsplihhjouyBEILMLHDCAxtmfdb...................',
'....................................abdlAMUWYZYWTPMKIGFFGHIIJJIHGEDDDEGHIGFEECAyvrnkfcccflsxADGKLKHDCAxtnfdb...................',
'...................................cbddjvHRWYZZXUQNKIGFFGGHIIIHGFEEEEEEFFFECBzxvrmgcc...cksyBDGIKKHDBAxtnfdb...................',
'..................................feddgjqzJPUXYYVRMJGFFEFFGHHHHGGGGGFFFFFEDBzxurokd.....dltyBDFIJJHDBAxtngdb...................',
'.................................hiigiklntzFLQTVTPLHFEDDDEFGGGGHHIIIHHIHGFDBzwsolgc.....eovyACEGIIGDBAxtohedf..................',
'.................................glkmprqqruxBFJMMKHEDCDDDEFFGHHIJJJJJJKKJHFCAwtold......gsyyzBDFGHGDCAyupifef..................',
'.................................glmrxzywvuvwyBEFFEDCDDDEFFGGHIJKKKJJLMMLJHEByuqld......iwAyyACEGGGECAyupifc...................',
'.................................flowDGGECAzzyzABDEEEEFFGGHHHIJJKKKKKLMNMLJGDzvrmd......kyCxxzCFGHGECByupifc...................',
'.................................flqBJMNMKIHFDBBCEGHHGGHIIIIIIIJJKKKKLMNNMKIFBxsmd......kyDxxADGHIHFDBzvpjfc...................',
'.................................ejrEORSRQOMJGEDEHIJIIIIJKKJIIIIIJJKLLMNNMLJGCysld......kyEyyBEGHIHFDBzvqjgef..................',
'................................fgjsHRUWVTROKHFFHJKKJJJJKKKJIIHHHIJJKLMNNMLJGCztmfb.....kyFzyBDFHHHGECzvqlgge..................',
'................................ehkvKSUWWURNJHGHIKKKKKKKLLKJIHHGGHIJKLMNNMLJGDAvpib.....kyFzyACEGHHGECAwsmgfe..................',
'................................dglANTVXWTPLIGHIJKKKKKKLLLKJHHGGFGIJKLMNNMLJGEBwpib.....kyDyxzBDFGHGECAwrlfed..................',
'................................chqEQUWWURNJHGHIJJJJKKKLLLJIGGGFGGIJKLMNMMKJHEAvoic.....kyAwwyBDFGHGECAwrleed..................',
'...............................dflwKRUVTQNKHGFGHHIIIJJKKKKIHGGGGGHJKLLMMMLKJHEAvojec....kyzvwyBDFHHHECzwrkedd..................',
'...............................dluFPSUUROKIGFFFGGHHIIJKKKJIGGGGGHIJLLLLLLKKJHEAwrlhd....kyywwzBEGHIHFCzwrkedc..................',
'...............................epCMRTVSPLIGFEDEEFGHIIJKKJJHGGGGHHJKMMLLKKKKIGECzumhc....kyzwxzCFGIIHFCzwrkedc..................',
'...............................fsGNRUTQNJHFDCCDEFGHIJKKKJIHGFGGHIKLMMLKKKKKIGEDBvoife...kyzxyACFHIIHFDAwrledc..................',
'...............................guJNRURNKHFDCBCDEFGGHIJKJIHGFFGGHIKMNMLKKKKJHGFECxqkhd...kyzxyACFHIIHGDBxsledb..................',
'..............................fmyKORTPLIFDBAABDEFFFGHIIIHGFFFGHIJLMNMLKKKKJHGGGDztlgc...kyzxyACFHIIHGDBxsmedb..................',
'..............................gtGMPSTPLHDBzzzABCDDEFGHHHGFFFFGHJKMNNMLKKKKIHHIHEAtmhee.kqAAyzBDFHIIHGEBxsmedb..................',
'..............................gvJNRTTPLHDAzyyzAABCDEGHHHGGGGGHIKLMNNMLKKJIIIJJIFBvpjhd.kyGCABCEFHIIHGEBxsledb..................',
'.............................fmzKORUTPLHEBAzzzzzABDEFGHHHHHHHIJKLMNNMLJIHHIJLLJGCxrkhc.iyGDCDEFGHHIHGEBxsmfdde.................',
'.............................guGMPSTROKHFDCBAAzABCDEFGHIIIIIIJKLMMMMLKIHGGIKMMKHDyslhc.guDDDEFGHHHHHGEBxtnhdee.................',
'............................fmzKORTROLJHFEEDCBBCDEFFGHIJJKKJJKLLLLKKJIGFFGJLNNLIEztnjfdjtBCDEFGHHHHHGECyupjded.................',
'............................guHMPSSQMJHFFFFFEEEFFGHHIJKLLLLLKKKKKJIHGFEEFHKMOOMJFAvqliimtzCEFGGHIIHHGFCzvqjded.................',
'............................hxJNRTSPLIFEEGHHHGHHIIJKLMMNNNNMKJIIHGFEDCCEGJLNPPOLHCytplkotzCEGHHIJJIIGFCzvqjded.................',
'...........................goBKORUSOLIFEFHJJJJJJKKMNOOOOOONMKHFEDCAzzzBEHKNOPQPNJFAwspoqvADFHIIJJKJIHFDzvqkeegh................',
'...........................hxHMPSUROKIFEFIKLLKKLLMNOOOOPONMKHECAywvvwxAEILNPPPPOLHCyvsstyCFGIJJJJKKJIGDAwrlgeih................',
'...........................iyJNRTVRNKHGFHJLMMMMMMNNNNNNNMLIGEAxusqpqtwAEJMNOOOPONJEAwvuwAEGHJJJJJJKKJGDAwsnidhg................',
'...........................jyJNRUUQMJHGGIKMMMMMMMMLLLKJJIHEBzwrnkjkmrvzEJLNNNNOONKGBywwyBFHIJJJIIIJJIGDAwsnidgg................',
'..........................goBKORUSPLJHGHJLNMMLLLKJIIHGFEECzwtqmgccfkotzEJLLMMMNNNLHCzxxzDGIJJIHGGGHIGECyvrmidff................',
'..........................gtGMPSSPMJHGFGIKLLKJJJHGFEDDAzywtqmkfc..cglryEIKLLMMMNNLHDAyyAEIJIHGFEEFFFDAzwtpkgdff................',
'..........................fpAIMNMKIGFEEEGHIIHHGFEDBzyywtsqmkgcc....dkqwCGJKLMMMMMLIEAzzBFIIHFDCCCCDBywvvsojeddf................',
'..........................emuzDEEDCCCBBCDEFEEDCBBzwutsrnkjfcc......cgmtAFIKLMMMMMLIEBzACGIHFCAzzzBBytrsurojddb.................',
'..........................fntwxxxxxyzzzABCCBAyxwvuqmlllgdcc.........ckryEIKLMMMMMKIFCBBDHIGDAywwzDEyroqsrojedb.................',
'..........................gqxzxvuuvwxyzABBAywtqoonkgdddc............cjpwCGJKLMMMLKIGDCDFIIFByvtuAHHzqnorrokfdb.................',
'..........................hsACzwuuvxyzABBBAxtoljiifc................cinvBFIJKLLLLKJGEEFHJIEzvsqsxyyvolnqrokfdb.................',
'..........................itBCzwuvwyABBCCBzwrmieccc.................bhmtzEGIJKKKKKJHFFFHIGBxtqpnkkkomjmpsplgedd................',
'..........................itAAxvuvxzBCCCCBzvpkhc....................bgkrxCFHIJJKKJIHFFFGGEzuqpqk...iljmpsqniefgh...............',
'..........................jtzxvttvxzBCDDCBytnjec....................cgjpvADFHIJJJJIHFEEEFCytponk...iljmpsrolhfjg...............',
'..........................jtxvtssuxzBCDDDBxsmic.....................dginsxADFGIJJJIHFEDCCAxsppk....hkjmpssqojfig...............',
'.........................jouwtrrsvxzBDDDDBxsmic.....................dhhkotxADFHJJJJHFDCAzxtqprk....hjilprtrokgig...............',
'.........................juyxusstvyABDDDCAxsmic.....................efggkpuyBEHJKKJIGDBzwtpmnmk....gihjnqtqnjgif...............',
'.........................jtyxvttuwyABCDDCAxsnjd......................ddfhmrwADGIKKJIGDAxuqljhh.....gfghmqtqmhgff...............',
'.........................jsxwvuuvxzABCDDCAxtokgd......................befkqvzDGIJKKIGDAwsnjhd.......dghmqsqmgfc................',
'.........................jsvvuuvwxzABCDDCAyvrokd......................ceekptxBEHIJKJGEAwrlhdc.......dghlpsplgfb................',
'.........................iruutuvxyzBCDDDCBzxtpld......................egehmrvzDFIJJIGEAwqkgb........dghlpsplfeb................',
'.........................iruttuvxzACDEFEDBzwtqle......................gfefjotxBEHIJIGDAwrkgb.......gfghmptqlgedd...............',
'.........................irtttuwyACDEFGFDBywtqmf.......................efeglqvzDGHIHGDAwrlhdb......gihknrurniffd...............',
'.........................irtttuwyBDEFGGFDByvsqng.......................gfeejotyCFGHHFDAxtnifb......gjilpsvspkffd...............',
'.........................irsrrtvyBDFGGGFDAxuqpng........................efdinswBDFGGFDByupjfb......hkjmqtwtpkfec...............',
'.........................iloopsvyBDFGGGEByvrnnng........................gifglqvzCEFGFEByvqjgb......hlknquwtpkeec...............',
'..........................gmmoruxADFGGFDAxtokjih........................ihgeinswADFGFEBzvqkgdc.....hllnrvxupkeec...............',
'..........................gmmoruxACEGGECzvsniif..........................giegjouyBEFFECzwrmhgfg....imloswyupkfec...............',
'..........................gmmoqtwzBEFFEBxtpkhhf..........................hhfdglrwACEFECAxtplhif....immptxyvqlffc...............',
'..........................gmmnpsvyBDFFDAvrnhfff...........................gedejpuyBDFEDBzvsniif...knnnquxzvrmgfc...............',
'..........................gllmoruxADEECytojffd.............................dedgmrwADFFEDAxsnjif...ktqpsvyzwsmgfc...............',
'..........................gmlmoruxACDDBxsmgedd.............................fedejpuzCEGFEBxtojie...kusrtwzzwsnheb...............',
'..........................hmmnpruxzCCCAwrledb...............................dddinsxBEFFECytpjie...kvtsuwzzwsnheb...............',
'..........................hoopqsuxzBCByuoiedc...............................efdgkqvzCEFECzupkihh..kvutuwyyvsnheb...............',
'..........................ipqqqsuwzABAwsmgddd...............................gfdeinsxADEECAwrnkkg..kwustvxyvsnheb...............',
'..........................irssrstwzAzyupjedb.................................eedgkpuyBDEDByupkjg..kprqsuxywtnheb...............',
'..........................jsutsstvyzyvrlfdbc.................................feddgnsxACEECzupkjf...kpqruxzwtohfb...............',
'..........................jtxvtstvxxwtpjdda...................................dcdekqvyBEECzvqkie...jpqsvyAxtpjgdc..............',
'..........................juywtstvxwvsnidda....................................bddgmsxACDCzvqkie...jppsvyAyvqmhfc..............',
'..........................jvzxtstvwwurmiddb....................................dbdejpuyBCBzvqkid...jpprvyAzwtoifc..............',
'..........................jvzwsstvxwuqmiddd.....................................bddgmrvzBAzvqlhd...jqqrvyAzwtohfb..............',
'..........................juxtrrtvxwtqlidfe.....................................cbdeiotwAAyvqlhc..kqtssvyAzwtohfb..............',
'.........................joutqpqsvwvtplidhg......................................addglquyAyvrlifdgpBCxuwyBAxtoifdd.............',
'.........................isuqnnpsuvusoliekh......................................cbdeioswzywsnjijoyHMEyyzBByvqlhgd.............',
'.........................iqromoqruutqolifmj.......................................addilptxywtqmklsEMOMEABCCzwsnhgd.............',
'.........................iqpmloqsutspmjgipk.......................................cddegmruxxvtqopuFPRTLFDECAxsmgfd.............',
'........................kospmmoqstsqoliekmk.......................................fddddinsvyxvtssvERTVTKGFDAwrmgfc.............',
'.......................kqxwsomprstsqmjghnj.........................................dabdekpuxzzxvuxEPVWXQIFCzvrlfec.............',
'.......................kxBzvqoqrttroliglmk...........................................abdgmsvzBAyxyDMXYYVLFCzvqlfec.............',
'.......................kwCAxsqrtutqmjgjoj.............................................adejotxACBzzDJUZZYOHDAwrlfeb.............',
'......................kqyBzvsrstusojgflmk.............................................bbdfkqvACCBACHPYZZQJEBxsnhfee............',
'......................kyEDytrrstsqmiegjj...............................................abdhnuyCDCBCGLSYXRKGCytojggd............',
'......................kyGEztqrssrokgdhg.................................................adfmsyCDDCCFJOTVSMHDzvqlggd............',
'......................kyGEysqssrqnieegh.................................................bdelrxBDDCDEHLPSSNIEAwrlgfd............',
'.....................kqBHEysqssrpmidfe..................................................cdeipvADDDDDGJMPQNJEAwrmggd............',
'.....................kyHJEysrssrpmiege..................................................dddgnuzCDDDDEHKNOMJEBxsnhgd............',
'.....................kyJJEytrsssqniege...................................................befmtyCDEDCDFILMMIEBxtnhfc............',
'....................jqBIHBwttuttrnjfge...................................................cefmtyBDEECCDGJLLIEAxsngfc............',
'....................jxHIEyutuvvtrnjege...................................................dffmsxBDEEDCCEHJJHDAwsmgeb............',
'....................jxIHCwssuwvurniefd...................................................dfglrwADEFECCDGIIGDAwrmfeb............',
'....................jxGEztrsvwvtqmided...................................................egglrwzCEFFDCCFHHGDAvrlfeb............',
'....................jxFCwsqsuvuspliddc...................................................eggkqvyCEGFEDDEGHGEBwrmgedd...........',
'....................jwDAuqqsuvusoliddc...................................................ehgkptyBEGGFEDEGHHGCysnifec...........',
'....................jwBxsqqsuvuspliddd...................................................ehfjosxBEGHGFEEGHHGEAupkeec...........',
'....................jvzuqpqsuvusplided...................................................fhfjnswBEGHHGFFGHHHFBwqkeec...........',
'....................juxsppqtvvusplidfe...................................................fhfhlqwBEHIIHGFFGHHGDxrlfeef..........',
'...................iovvropruwwvsplidge...................................................gfeekqwBEGHIIGFFGGGGDysnhege..........',
'...................iuyuqopsvxwvsplidge....................................................dedjqvzCFHIIHGFFFFFDzuojefe..........',
'...................itxuqprtwyxvsojgdgf....................................................efdhnsxBDGIIHFEEEEDByuojeed..........',
'...................isvsppsuxyxvrniedef....................................................eeddjpvzCFHHGEDDDDCAwrnidec..........',
'...................irtqppsvxyxvrmiddd......................................................cbdfmsxBEGGFDCCCBAyvpkiddc..........',
'..................insrpoqsvxxwurmidfe.......................................................addkqvzCEEEDCBAyxwuogeddb..........',
'..................jtvrpoqsvxwvspkgdhf.......................................................addgntxBCDDCBAyvtsrnhddda..........',
'..................jtvrppqsuwvtrnieegh.......................................................bbdekrvyACCBAywspplgdcdda..........',
'..................jtuqooqsuvutplgdge.........................................................addhntxzBCAywtpnni..bbba..........',
'..................jtuqnoqsuuusojeefg.........................................................abddjqvxABzxurmkji...aa...........',
'..................jtupmoqsuutrmhdfe...........................................................abdfnswzBzxuqljf.................',
'..................jttpmoqsttspkeefg............................................................addkqvyAzxuqlje.................',
'..................jssoloqttspmhdfe.............................................................addiptwzzxupkhe.................',
'..................jsrnloqttrnjedef.............................................................cddglquwywsoigd.................',
'..................iqplloqtsqmidfe..............................................................feddinruwurmgfc.................',
'..................iqnkloqrrplifig...............................................................edefkorutqmgec.................',
'..................jqnjloqqpmjghmi................................................................ddeglqttqmgeb.................',
'..................jqniloqpnlieikj.................................................................ceejorsqmgeb.................',
'..................jqmiloqoljgfjh..................................................................efdglosqmgedd................',
'.................koqlimopmjgdfii..................................................................gfddhmqqmieed................',
'.................kvumjlnomiedef....................................................................eddekoqnjeegh...............',
'.................korkgjlnliddc......................................................................cddhlookgeig...............',
'..................jkjdgjljgddd......................................................................dcdejmoliehf...............',
'...................gfdeijgddde.......................................................................bddgjmlidge...............',
'....................cddiiedbb........................................................................cbddgklidfd...............',
'....................cddiidda..........................................................................abdeiliddd...............',
'....................cddigdda...........................................................................addiliddc...............',
'....................bddiedbb..........................................................................cbdeiliddb...............',
'....................bddidda............................................................................addiliedcd..............',
'....................addidda............................................................................bddgjjgddc..............',
'...................dcdegddb............................................................................ccdeiliddb..............',
'...................dddgedbd.............................................................................bddgkiddb..............',
'...................dddgddb..............................................................................dcdejiddb..............',
'...................dddedcd...............................................................................bddiiddb..............',
'...................cddddb................................................................................cddfeeddd.............',
'..................gfdeded................................................................................efeeeddfd.............',
'..................giegdgf................................................................................fefdbcded.............',
'..................gheeefg.................................................................................dec.bddeg............',
'..................fhfefd...................................................................................c..cddee............',
'..................egfggff.....................................................................................cdddd............',
'.........bccdd...ffghjhhd..........aaaa.....aa................................................................cdddef...........',
'......baacdefed.eghhkmhfb........aabddbaaaaaccaa..............................................................cdddfhh.....aa...',
'.....acdddefhigdgjjmpojgdaaa....acfgiifdddegiigca.............................................................dfdgehe.h..ccca..',
'.....aeghiknomljjkortqmigeecaa.achmpssniefjnpolhda............................................................eedeegfeiedfhheb.',
'.....bhkpqsvuspnnpsvxurnkigfecacgmuzAAvroorutplgd..............................................................dfdgfhjlkkkkge..',
'.....cjnsxyyyvtssuxxwvvtrpnkigfgksAFFDzvstuwsnif...............................................................eeeeijloopqmf...',
'.....elqvwwvutstuvvvuttttsssqnllqwBDCAwsqsstrnf.................................................................ceekmprtusph...',
'.....fnsttrqopqrssrrqqqqrssssrppqtxzyvsnlnmooig.................................................................cffgilnprqli...',
'.....gkoonllllmnnnmmllmnppqqppoonpqrqomheieiif..................................................................ddefhijlnkh....',
'......gffeeeefffffeeeeeghhhhhhhhgghhgfee.e.ff....................................................................cbbcdeefg.....',
'...............................................................................................................................'],
 k:['..............................ZLBuojgddgjouBLZ.................................................................................',
'............................ZZTJAtnjfddfjntAJTZ................................................................................',
'...........................ZTLJDxrmifccfimrxDJTZZZ.............................................................................',
'..........................ZTJDAxsokheccehkosxDJLLZ.............................................................................',
'..........................ZLDxtrolifdbbdfilosxABLZ.............................................................................',
'.........................ZTJAtomkifdcaacdfiloruBLZ.............................................................................',
'.........................ZLDxrmihfdcbaabcdfikntAJTZ............................................................................',
'.........................ZLBuokhedcbaaacdfikmnrxDLZ............................................................................',
'.........................ZLDxrmifcbaaabdfilortuuBLZ............................................................................',
'.........................ZTJAtnjfdbaaacehkosxABBAJTZ...........................................................................',
'..........................ZLBuojgdbbbbcfimrxDJLLJDJTZ...ZZ.....................................................................',
'..........................ZLBuojgddddddfjntAJTZZTJDLZ..ZTTZ....................................................................',
'..........................ZLBuojggggggghjouBLZ..ZTJJTZZTJJTZ...................................................................',
'.........................ZTJAtnjjjjjjjjkmouBLZ...ZLDJLLJDDJTZZZZZ..............................................................',
'.......................ZZTJDxrnooooooooortuAJTZ..ZTJABBAxxDJLLLLTZ.............................................................',
'.....................ZZTLJDxsrtuuuuuuuuuxABDJTZ...ZLBuutrsxABBBDJTZZZ..........................................................',
'....................ZTLJDAxuuxABBBBBBBBBDJLLTZ....ZLBuonmortuuuxDJLLTZ.........................................................',
'..................ZZTJDABBBBBDJLLLLLLLLLLTZZZ.....ZLBuojikmnooosxABDJTZ........................................................',
'................ZZTLJDDJLLLLLLTZZZZZZZZZZZ........ZLBuojghijjjlortuxDJTZZ......................................................',
'...............ZTLJDADJTZZZZZZZ...................ZLBuojgeffggikmnosxDJLZ......................................................',
'.............ZZTJDADJLTZ..........................ZLBuojgdcdddfhijlosxBLZ......................................................',
'...........ZZTLJDxDJTZZ.........................ZZTJAtnjfdbbbcdeffilotAJTZ.....................................................',
'.......ZZZZTLJDAxDJTZ..........................ZTLJDxrmifcbaaabccdfimrxDLZ.....................................................',
'..ZZ..ZTLLLJDAxtAJTZ...........................ZLDAxsokhecaaaaaabcfimrxDLZ.....................................................',
'.ZTTZZTJDBBAxtsxDLZ............................ZLBurolifdbaaaaaabdfjntAJTZ.....................................................',
'.ZLJLLJDxuutrrxDJTZ............................ZLBuokifdcaaaaaaabdgjouBLZ......................................................',
'ZTJABBAxsoonntAJTZ.............................ZLDxrmifcbaaaaaaabdgjouBLZ......................................................',
'LJDxuutroljjouBLZ..............................ZTJAtnjfdbaaaaaaabdgjouBLZ......................................................',
'BAxsoonmkigjouBLZ...............................ZLBuojgdbaaaaaaabdgjouBLZ......................................................',
'BAxsokjihfgjouBLZ...............................ZLBuojgdbaaaaaaabdgjouBLZ......................................................',
'LJDxrmifedgjouBLZ...............................ZLBuojgdbaaaaaaabdgjouBLZ......................................................',
'ZTJAtokhedgjouBLZ...............................ZLBuokhecaaaaaabcehkouBLZ......................................................',
'.ZLDxrmifdfjntAJTZ..............................ZLDxrmifdbaaaaacdfimrxDLZ......................................................',
'.ZTJAtnjfdfimrxDJTZZ............................ZTJAtokhecbaaabdfilotAJTZ......................................................',
'..ZLBuojgdehkosxDJLTZ............................ZLDxrmifdcaaacehkosxDLZ.......................................................',
'..ZLBuokhedfilosxADJTZZ..........................ZTJAtolifdbabcfimrxDJTZ.......................................................',
'..ZLDxrmifddfilortxDJLTZ..........................ZLDxsokhecabdfjntAJTZ........................................................',
'..ZTJAtolifddfikmosxADJTZZ........................ZTJDxrmifcbcehkouBLZ.........................................................',
'...ZLDxsokhecdfhilortxDJLTZ........................ZTJAtnjfdbcfimrxDLZ.........................................................',
'...ZTJDxrmifdcdefikmosxADJTZ........................ZLBuojgdbdfjntAJTZ.........................................................',
'....ZTJAtolifdccdfhilortxDJTZ.......................ZLBuojgdbdgjouBLZ..........................................................',
'.....ZLDxsolifdbcdefikmosxDJTZZ.....................ZLBuojgdcdgjouBLZ..........................................................',
'.....ZTJDxsokhecbbcdfhilosxDJLTZZ...................ZLBuojgddfhjouBLZ..........................................................',
'......ZTJDxrmifdcabcdefilosxADJLTZ................ZZTJAtnjfdfikmouBLZ..........................................................',
'.......ZTJAtolifdbaabcdfilortxADJTZ.......ZZZZZZZZTLJDxrmiffilortxDLZ..........................................................',
'........ZLDxsokhecbaabcdfikmortxDJTZ....ZZTLLLLLLLJDAxsokhfilosxADJTZ..........................................................',
'........ZTJDxrmifedcbabcdfhikmosxDJTZ..ZTLJDBBBBBBAxtrolifhkosxDJLTZ...........................................................',
'.........ZTJAtolihfdcbabcdefhilosxDJTZZTJDAxuuuuuutromkiffimrxDJTZZ............................................................',
'..........ZLDxsomkifdcbaabcdefilosxDJLLJDxtroooooonmkihfdfjntAJTZ..............................................................',
'..........ZTJDxtrolifedcbaabcdfilosxABBAxsomkjjjjjjihfeddgjouBLZ...............................................................',
'...........ZTJDAxsolihfedcbabcdfilortuutrolihgggggffedcbdgjouBLZ...............................................................',
'............ZTLJDxsomkihfedcbbcdfikmnoonmkifeddddddccbabdgjouBLZ.................ZZZZZZ........................................',
'.............ZZTJDxtromkihfedcbcdfhijjjjihfdcbbbbbbbaaabdfjntAJTZ.............ZZZTLLLLTZZ......................................',
'...............ZTJDAxtromkihfdcbcdeffggffedcbaaaaaaaaaabcfimrxDLZ.......ZZZZZZTLLJDBBDJLTZ.....................................',
'................ZTLJDAxtromkifedcbccddddccbaaaaaaaaaaaaacehkouBLZ.....ZZTLLLLLJDBAxuuxADJTZ....................................',
'.................ZZTLJDAxtrolihfdcbbbbbbbaaaaaaaaaaaaaaabdfjntAJTZZZZZTLJDBBBBAxutroortxDJTZ...................................',
'...................ZZTLJDAxsomkifdcaaaaaaaaaaaaaaaaaaaaabcfimrxDJLLLLLJDAxuuuutronmkkmosxDJTZ..................................',
'.....................ZZTLJDxtrolifdbaaaaaaaaaaaaaaaaaaaaacehkosxABBBBBAxtroooonmkjjjjilosxDJTZ.................................',
'.......................ZZTJDAxsokhedcbaaaaaaaaaaaaaaaaaaabdfilortuuuuutromkjjjjikmnonmklosxDLZ.................................',
'.........................ZTLJDxrmihfdcbaaaaaaaaaaaaaaaaaaacdfikmnooooonmkihgggilortutrollotAJTZ................................',
'..........................ZZTJAtomkifdcaaaaaaaaaaaaaaaaaaabcdfhijjjjjjjihfedfilosxABAxsolmrxDLZ................................',
'............................ZLDxtrolifdbaaaaaaaaaaaaaaaaaaabcdeffgggggffedcehkosxDJLJDxsolotAJTZ...............................',
'............................ZTJDAxsokhecaaaaaaaaaaaaaaaaaaaaabccdddddddccbcfimrxDJTZTJDxsomrxDJTZ..............................',
'.............................ZTLJDxrmifdbaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbabdfjntAJTZ.ZTJDxsoosxDLZ..............................',
'..............................ZZTJAtokhecaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacehkouBLZ...ZTJDxsoouBLZ..............................',
'................................ZLDxrmifcbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdfimrxDLZ....ZTJDxrouBLZ..............................',
'................................ZTJAtnjfdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacehkotAJTZ.....ZTJAtouBLZ..............................',
'.................................ZLBuojgdcbaaaaaaaaaaaaaaaaaaaaaaaaaaaabcfimrxDLZ.......ZLBuotAJTZ.............................',
'.................................ZLBuolifdcaaaaaaaaaaaaaaaaaaaaaaaaaaaabdfjntAJTZ.......ZLBuorxDLZ.............................',
'.................................ZLDxsolifdbaaaaaaaaaaaaaaaaaaaaaaaaaaabdgjouBLZ........ZLBuoouBLZ.............................',
'.................................ZTJDxsokhecaaaaaaaaaaaaaaaaaaaaaaaaaaabdgjouBLZ........ZLBuoouBLZ.............................',
'..................................ZTJDxrmifdbaaaaaaaaaaaaaaaaaaaaaaaaaabdgjouBLZ........ZLBuontAJTZ............................',
'...................................ZTJAtokhecaaaaaaaaaaaaaaaaaaaaaaaaaabdgjouBLZ........ZLBuomrxDJTZ...........................',
'....................................ZLDxrmifdbaaaaaaaaaaaaaaaaaaaaaaaaacehkouBLZ........ZLBuokosxDLZ...........................',
'....................................ZTJAtokhecaaaaaaaaaaaaaaaaaaaaaaaabcfimrxDLZ.......ZTJAtnjlotAJTZ..........................',
'.....................................ZLDxrmifcbaaaaaaaaaaaaaaaaaaaaaaabdfjntAJTZ.......ZLDxrmiimrxDLZ..........................',
'.....................................ZTJAtnjfdbaaaaaaaaaaaaaaaaaaaaaaacehkouBLZ........ZLDxrmihkotAJTZ.........................',
'......................................ZLBuojgdbaaaaaaaaaaaaaaaaaaaaaabcfimrxDLZ........ZTJAtoliimrxDLZ.........................',
'......................................ZLBuojgdbaaaaaaaaaaaaaaaaaaaaaabdfjntAJTZ.........ZLDxsokhkotAJTZ........................',
'......................................ZLBuojgdbaaaaaaaaaaaaaaaaaaaaaacehkouBLZ..........ZTJDxrmiimrxDLZ........................',
'.....................................ZTJAtnjfdbaaaaaaaaaaaaaaaaaaaaabcfimrxDLZ...........ZTJAtokhkouBLZ........................',
'.....................................ZLDxrmifcbaaaaaaaaaaaaaaaaaaaaabdfjntAJTZ............ZLDxrmijouBLZ........................',
'....................................ZTJAtokhecaaaaaaaaaaaaaaaaaaaaaabdgjouBLZ.............ZTJAtokjouBLZ........................',
'....................................ZTJAtnjfdbaaaaaaaaaaaaaaaaaaaaaabdgjouBLZ..............ZLDxrmkouBLZ........................',
'.....................................ZLBuokhecaaaaaaaaaaaaaaaaaaaaaabdgjouBLZ..............ZTJAtroouBLZ........................',
'.....................................ZLDxrmifcbaaaaaaaaaaaaaaaaaaaaabdgjouBLZ...............ZLDAxsouBLZ........................',
'.....................................ZTJAtnjfdbaaaaaaaaaaaaaaaaaaaaabdgjouBLZ...............ZTLJDxstAJTZ.......................',
'......................................ZLBuojgdbaaaaaaaaaaaaaaaaaaaaabdgjouBLZ................ZZTJDxrxDJTZ......................',
'......................................ZLBuokhecaaaaaaaaaaaaaaaaaaaaabdgjouBLZ..................ZTJAtsxDLZ......................',
'......................................ZLDxrmifcbaaaaaaaaaaaaaaaaaaaabdgjouBLZ...................ZLBuotAJTZ.....................',
'......................................ZTJAtnjfdbaaaaaaaaaaaaaaaaaaaabdgjouBLZ..................ZTJAtnrxDLZ.....................',
'.......................................ZLBuojgdbaaaaaaaaaaaaaaaaaaaabdfjntAJTZ................ZTJDxrmouBLZ.....................',
'.......................................ZLBuojgdbaaaaaaaaaaaaaaaaaaaabcfimrxDJTZ.............ZZTJDxsokntAJTZ....................',
'.......................................ZLBuojgdbaaaaaaaaaaaaaaaaaaaaacehkosxDJTZZ..........ZTLJDxsolimrxDLZ....................',
'.....................................ZZTJAtnjfdbaaaaaaaaaaaaaaaaaaaaabdfilosxDJLTZZZ.....ZZTJDAxsolihkouBLZ....................',
'....................................ZTLJDxrmifcbaaaaaaaaaaaaaaaaaaaaaacdfilosxADJLLTZZZZZTLJDxtrolifgjouBLZ....................',
'...................................ZTJDAxsokhecaaaaaaaaaaaaaaaaaaaaaaabcdfilortxABDJLLLLLJDAxsomkifdgjouBLZ....................',
'...................................ZTJDxrolifdbaaaaaaaaaaaaaaaaaaaaaaaabcdfikmortuxABBBBBAxtrolihfddgjouBLZ....................',
'....................................ZTJAtnjfdcaaaaaaaaaaaaaaaaaaaaaaaaaabcdfhikmnortuuuuutromkifedcdfjntAJTZ...................',
'.....................................ZLBuojgdbaaaaaaaaaaaaaaaaaaaaaaaaaaabcdefhijkmnooooonmkihfdcbbcfimrxDLZ...................',
'.....................................ZLBuojgdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaabcdefhikmnooonmkifedcbaacehkouBLZ...................',
'.....................................ZLBuojgdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacdfikmortuuutrolifdbaaabdgjouBLZ...................',
'.....................................ZLBuojgdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdfilortxABBBAxsokhecaaabdgjouBLZ...................',
'.....................................ZLBuojgdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaacehkosxADJLLLJDxrmifcbaabdgjouBLZ...................',
'....................................ZTJAtnjfdbaaaaaaaaaaaaaaaaaaaaaaaaaaaabdfimrxDJLTZZZTJAtnjfdbaabdgjouBLZ...................',
'...................................ZTJDxrmifcbaaaaaaaaaaaaaaaaaaaaaaaaaaaacehkotAJTZZ...ZLBuojgdbaabdgjouBLZ...................',
'..................................ZTJDxsokhecaaaaaaaaaaaaaaaaaaaaaaaaaaaabcfimrxDLZ.....ZLBuojgdbaabdgjouBLZ...................',
'.................................ZTJDxsolifdbaaaaaaaaaaaaaaaaaaaaaaaaaaaabdfjntAJTZ.....ZLBuojgdbaabdfjntAJTZ..................',
'.................................ZLDxsolifdcaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdgjouBLZ......ZLBuojgdbaabdfjntAJTZ..................',
'.................................ZLBuolifdcbaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdgjouBLZ......ZLBuojgdbaabdgjouBLZ...................',
'.................................ZLBuojgdcbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdgjouBLZ......ZLBuojgdbaabdgjouBLZ...................',
'.................................ZLBuojgdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdgjouBLZ......ZLBuojgdbaabdgjouBLZ...................',
'.................................ZLBuojgdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdgjouBLZ......ZLBuojgdbaabdfjntAJTZ..................',
'................................ZTJAtnjfdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdfjntAJTZ.....ZLBuojgdbaabcfimrxDLZ..................',
'................................ZLDxrmifcbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabcfimrxDLZ.....ZLBuojgdbaaacehkouBLZ..................',
'................................ZLBuokhecaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacehkouBLZ.....ZLBuojgdbaaabdgjouBLZ..................',
'................................ZLBuojgdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdgjouBLZ.....ZLBuojgdbaaabdgjouBLZ..................',
'...............................ZTJAtnjfdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdfjntAJTZ....ZLBuojgdbaaabdgjouBLZ..................',
'...............................ZLDxrmifcbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabcfimrxDLZ....ZLBuojgdbaaabdgjouBLZ..................',
'...............................ZLBuokhecaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacehkouBLZ....ZLBuojgdbaaabdgjouBLZ..................',
'...............................ZLBuojgdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdfjntAJTZ...ZLBuojgdbaaabdgjouBLZ..................',
'...............................ZLBuojgdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabcfimrxDLZ...ZLBuojgdbaaabdgjouBLZ..................',
'..............................ZTJAtnjfdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacehkouBLZ...ZLBuojgdbaaabdgjouBLZ..................',
'..............................ZLDxrmifcbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdfjntAJTZ.ZTJAtnjfdbaaabdgjouBLZ..................',
'..............................ZLBuokhecaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabcfimrxDLZ.ZLDxrmifcbaaabdgjouBLZ..................',
'.............................ZTJAtnjfdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacehkouBLZ.ZLBuokhecaaaabdfjntAJTZ.................',
'.............................ZLDxrmifcbaaaaaaaaaaaaaaaaaaaaaaabbbbbbaaaaaaaaabdgjouBLZ.ZLBuojgdbaaaabcfimrxDLZ.................',
'............................ZTJAtokhecaaaaaaaaaaaaaaaaaaaaaabccddddccbaaaaaaabdfjntAJTZTJAtnjfdbaaaaacehkouBLZ.................',
'............................ZLDxrmifdbaaaaaaaaaaaaaaaaaaaabcdeffggffedcbaaaaabcfimrxDJLJDxrmifcbaaaaabdgjouBLZ.................',
'............................ZLBuokhecaaaaaaaaaaaaaaaaaaaabcdfhijjjjihfdcbaaaaacehkosxABAxsokhecaaaaaabdgjouBLZ.................',
'...........................ZTJAtnjfdbaaaaaaaaaaaaaaaaabbcdefikmnoonmkifdcbaaaabdfilortutrolifdbaaaaaabdfjntAJTZ................',
'...........................ZLDxrmifcbaaaaaaaaaaaaabbbccdefhilortuutrolifdcaaaaacdfikmnonmkifdcaaaaaaabcfimrxDLZ................',
'...........................ZLBuokhecaaaaaaaaaaaabccddeffhikmosxABBAxsolifdbaaaabcdfhijjjihfdcbaaaaaaaacehkouBLZ................',
'...........................ZLBuojgdbaaaaaaaaaabcdeffghijkmortxDJLLJDxsokhecaaaaabcdeffgffedcbabbbbbbbabdgjouBLZ................',
'..........................ZTJAtnjfdbaaaaaaaabccdfhijjkmnortxADJTZZTJDxrmifdbaaaaaabccdddccbabccdddddcccehkouBLZ................',
'..........................ZLDxrmifcbaaaaaabcdeffikmnoortuxADJLTZ..ZTJAtokhecaaaaaaaabbbbbabcdeffgggffedfimrxDLZ................',
'..........................ZLBuokhecaaaaaabcdfhijlortuuxABDJLTZZ....ZLDxrmifcbaaaaaaaaaaaabcdfhijjjjjihffjntAJTZ................',
'..........................ZLBuojgdbaaaaaacdfikmnosxABBDJLLTZZ......ZTJAtnjfdbaaaaaaaaaaaacdfikmnooonmkigjouBLZ.................',
'..........................ZLBuojgdbaaaaabdfilortuxDJLLLTZZZ.........ZLBuojgdbaaaaaaaaaaabdfilortuuutrolijouBLZ.................',
'..........................ZLBuojgdbaaaaacehkosxABDJTZZZZ............ZLBuojgdbaaaaaaaaaaacehkosxABBBAxsokjouBLZ.................',
'..........................ZLBuojgdbaaaabdfimrxDJLLTZ................ZLBuojgdbaaaaaaaaaabdfimrxDJLLLJDxrmjouBLZ.................',
'..........................ZLBuojgdbaaaacehkotAJTZZZ.................ZLBuojgdbaaaaaaaaaacehkotAJTZZZTJAtnjntAJTZ................',
'..........................ZLBuojgdbaaabcfimrxDLZ....................ZLBuojgdbaaaaaaaaabcfimrxDLZ...ZLBuojmrxDJTZ...............',
'..........................ZLBuojgdbaaabdfjntAJTZ....................ZLBuojgdcaaaaaaaaacdfjntAJTZ...ZLBuojkosxDLZ...............',
'..........................ZLBuojgdbaaabdgjouBLZ.....................ZLBuolifdbaaaaaaabdfilouBLZ....ZLBuojilouBLZ...............',
'.........................ZTJAtnjfdbaaabdgjouBLZ.....................ZLDxsokhecaaaaaaacehkosxDLZ....ZLBuokhkouBLZ...............',
'.........................ZLDxrmifcbaaabdgjouBLZ.....................ZTJDxrmifcbaaaaabdfimrxDJTZ....ZLDxrmimrxDLZ...............',
'.........................ZLBuokhecaaaabdgjouBLZ......................ZTJAtnjfdbaaaaacehkotAJTZ.....ZTJAtnjntAJTZ...............',
'.........................ZLBuojgdbaaaabdfjntAJTZ......................ZLBuojgdbaaaabcfimrxDLZ.......ZLBuojouBLZ................',
'.........................ZLBuojgdbaaaabcfimrxDLZ......................ZLBuokhecaaaabdfjntAJTZ.......ZLBuojouBLZ................',
'.........................ZLBuojgdbaaaaacehkouBLZ......................ZLDxrmifdbaaabdgjouBLZ........ZLBuojouBLZ................',
'.........................ZLBuojgdbaaaaabdgjouBLZ......................ZTJAtokhecaaabdgjouBLZ.......ZTJAtnjntAJTZ...............',
'.........................ZLBuojgdbaaaaabdgjouBLZ.......................ZLDxrmifcbaabdfjntAJTZ......ZLDxrmimrxDLZ...............',
'.........................ZLBuokhecaaaaabdgjouBLZ.......................ZTJAtnjfdbaabcfimrxDLZ......ZLBuokhkouBLZ...............',
'.........................ZLDxrmifcbaaaacehkouBLZ........................ZLBuokhecbaacehkouBLZ......ZLBuojgjouBLZ...............',
'.........................ZTJAtnjfdbaaabcfimrxDLZ........................ZLDxrmifdcaabdgjouBLZ......ZLBuojgjouBLZ...............',
'..........................ZLBuojgdbaaabdfjntAJTZ........................ZTJAtolifdbabdfjntAJTZ.....ZLBuojgjouBLZ...............',
'..........................ZLBuojgdbaaacehkouBLZ..........................ZLDxsokhecabcfimrxDJTZ....ZLBuojgjouBLZ...............',
'..........................ZLBuojgdbaabdfimrxDLZ..........................ZTJDxrmifdbacehkosxDLZ....ZLBuojgjouBLZ...............',
'..........................ZLBuojgdbaacehkotAJTZ...........................ZTJAtokhecabdfilouBLZ...ZTJAtnjgjouBLZ...............',
'..........................ZLBuojgdbabcfimrxDLZ.............................ZLDxrmifcbacdgjouBLZ...ZLDxrmigjouBLZ...............',
'..........................ZLBuojgdbabdfjntAJTZ.............................ZTJAtnjfdbabdgjouBLZ...ZLBuokhgjouBLZ...............',
'..........................ZLBuojgdbacehkouBLZ...............................ZLBuokhecbbdgjouBLZ...ZLBuojggjouBLZ...............',
'..........................ZLBuojgdbbdfimrxDLZ...............................ZLDxrmifdcbdfjntAJTZ..ZLBuokhgjouBLZ...............',
'..........................ZLBuojgdbcehkotAJTZ...............................ZTJAtolifdbcfimrxDLZ..ZLDxrmigjouBLZ...............',
'..........................ZLBuojgdbcfimrxDLZ.................................ZLDxsokheccehkouBLZ..ZTJAtnjgjouBLZ...............',
'..........................ZLBuojgdbdfjntAJTZ.................................ZTJDxrmifdbdgjouBLZ...ZLBuojgjouBLZ...............',
'..........................ZLBuojgdbdgjouBLZ...................................ZTJAtokhecdgjouBLZ...ZLBuojgjntAJTZ..............',
'..........................ZLBuojgdbdgjouBLZ....................................ZLDxrmifddgjouBLZ...ZLBuojgimrxDLZ..............',
'..........................ZLBuojgdbdgjouBLZ....................................ZTJAtokhedgjouBLZ...ZLBuojghkouBLZ..............',
'..........................ZLBuojgdbdgjouBLZ.....................................ZLDxrmifdgjouBLZ...ZLBuojggjouBLZ..............',
'..........................ZLBuojgdbdgjouBLZ.....................................ZTJAtokhegjouBLZ..ZTJAtnjfgjouBLZ..............',
'.........................ZTJAtnjfdbdgjouBLZ......................................ZLDxrmiffjntAJTZZTJDxrmiffjntAJTZ.............',
'.........................ZLDxrmifcbdgjouBLZ......................................ZTJAtnkifimrxDJLLJDxsokhefimrxDLZ.............',
'.........................ZLBuokheccehkouBLZ.......................................ZLBurolihkosxABBAxsolifdehkouBLZ.............',
'.........................ZLBuojgdbdfimrxDLZ.......................................ZLDAxsoliilortuutrolifdcdgjouBLZ.............',
'........................ZTJAtnjfdcehkotAJTZ.......................................ZTLJDxsokhikmnoonmkifdcbdgjouBLZ.............',
'.......................ZTJDxrmifcdfimrxDLZ.........................................ZZTJDxrmifhijjjjihfdcbbdgjouBLZ.............',
'.......................ZLDxsokhedfilotAJTZ...........................................ZTJAtolifffggffedcbabdgjouBLZ.............',
'.......................ZLBuolifdehkosxDLZ.............................................ZLDxsokheddddccbaaabdgjouBLZ.............',
'......................ZTJAtnjfddfimrxDJTZ.............................................ZTJDxrmifcbbbbaaaaabdfjntAJTZ............',
'......................ZLDxrmifcehkotAJTZ...............................................ZTJAtnjfdbaaaaaaaabcfimrxDLZ............',
'......................ZLBuokhecfimrxDLZ.................................................ZLBuojgdbaaaaaaaaacehkouBLZ............',
'......................ZLBuojgddfjntAJTZ.................................................ZLBuokhecaaaaaaaaabdgjouBLZ............',
'.....................ZTJAtnjfddgjouBLZ..................................................ZLDxrmifcbaaaaaaaabdgjouBLZ............',
'.....................ZLDxrmifcdgjouBLZ..................................................ZTJAtnjfdbaaaaaaaabdgjouBLZ............',
'.....................ZLBuokhecdgjouBLZ...................................................ZLBuojgdbaaaaaaaabdgjouBLZ............',
'....................ZTJAtnjfdbdgjouBLZ...................................................ZLBuojgdbaaaaaaaabdgjouBLZ............',
'....................ZLDxrmifcbdgjouBLZ...................................................ZLBuojgdbaaaaaaaabdgjouBLZ............',
'....................ZLBuokhecbdgjouBLZ...................................................ZLBuojgdbaaaaaaaabdgjouBLZ............',
'....................ZLBuojgdbbdgjouBLZ...................................................ZLBuojgdbaaaaaaaabdgjouBLZ............',
'....................ZLBuojgdbbdgjouBLZ...................................................ZLBuojgdbaaaaaaaabdfjntAJTZ...........',
'....................ZLBuojgdbbdgjouBLZ...................................................ZLBuojgdbaaaaaaaabcfimrxDLZ...........',
'....................ZLBuojgdbbdgjouBLZ...................................................ZLBuojgdbaaaaaaaaacehkouBLZ...........',
'....................ZLBuojgdbbdgjouBLZ...................................................ZLBuokhecaaaaaaaaabdgjouBLZ...........',
'....................ZLBuojgdbbdgjouBLZ...................................................ZLDxrmifcbaaaaaaaabdfjntAJTZ..........',
'...................ZTJAtnjfdbbdgjouBLZ...................................................ZTJAtnjfdcaaaaaaaabcfimrxDLZ..........',
'...................ZLDxrmifcbcehkouBLZ....................................................ZLBuolifdbaaaaabcdefhkouBLZ..........',
'...................ZLBuokhecbcfimrxDLZ....................................................ZLDxsokhecaaaabcdfhijjouBLZ..........',
'...................ZLBuojgdbbdfjntAJTZ....................................................ZTJDxrmifcbaaacdfikmnoouBLZ..........',
'...................ZLBuojgdbbdgjouBLZ......................................................ZTJAtnjfdbaabdfilortuuuBLZ..........',
'..................ZTJAtnjfdbcehkouBLZ.......................................................ZLBuokhecbacehkosxABBABLZ..........',
'..................ZLDxrmifcbdfimrxDLZ.......................................................ZLDxrmifdcbdfimrxDJLLJDLZ..........',
'..................ZLBuokheccehkotAJTZ.......................................................ZTJAtolifdcehkotAJTZZTJLZ..........',
'..................ZLBuojgdbdfimrxDLZ.........................................................ZLDxsokhecfimrxDLZ..ZTTZ..........',
'..................ZLBuojgdcehkotAJTZ.........................................................ZTJDxrmifdfjntAJTZ...ZZ...........',
'..................ZLBuojgddfimrxDLZ...........................................................ZTJAtnjfdgjouBLZ.................',
'..................ZLBuojgdehkotAJTZ............................................................ZLBuojgdgjouBLZ.................',
'..................ZLBuojgdfimrxDLZ.............................................................ZLBuolifgjouBLZ.................',
'..................ZLBuojgdfjntAJTZ.............................................................ZLDxsoligjouBLZ.................',
'..................ZLBuojgdgjouBLZ..............................................................ZTJDxsokhjouBLZ.................',
'..................ZLBuojgehkouBLZ...............................................................ZTJDxrmijouBLZ.................',
'..................ZLBuojgfimrxDLZ................................................................ZTJAtnjjouBLZ.................',
'..................ZLBuojgilotAJTZ.................................................................ZLBuoljouBLZ.................',
'..................ZLBuojhkosxDLZ..................................................................ZLDxsokntAJTZ................',
'.................ZTJAtnjimrxDJTZ..................................................................ZTJDxrmmrxDLZ................',
'.................ZLDxsoljntAJTZ....................................................................ZTJAtokotAJTZ...............',
'.................ZTJDxsolouBLZ......................................................................ZLDxrmmrxDLZ...............',
'..................ZTJDxrosxDLZ......................................................................ZTJAtolouBLZ...............',
'...................ZTJAtrxDJTZ.......................................................................ZLDxsoouBLZ...............',
'....................ZLButAJTZ........................................................................ZTJDxrouBLZ...............',
'....................ZLBuuBLZ..........................................................................ZTJAtouBLZ...............',
'....................ZLBuxDLZ...........................................................................ZLBuouBLZ...............',
'....................ZLBuAJTZ..........................................................................ZTJAtouBLZ...............',
'....................ZLBuBLZ............................................................................ZLBuotAJTZ..............',
'....................ZLBuBLZ............................................................................ZLDxrrxDLZ..............',
'...................ZTJAxDLZ............................................................................ZTJAtouBLZ..............',
'...................ZLDxAJTZ.............................................................................ZLDxruBLZ..............',
'...................ZLBxDLZ..............................................................................ZTJAtuBLZ..............',
'...................ZLBAJTZ...............................................................................ZLBuuBLZ..............',
'...................ZLBBLZ................................................................................ZLBABAJTZ.............',
'..................ZTJABLZ................................................................................ZLDJLJDLZ.............',
'..................ZLDxDLZ................................................................................ZTJTZTJLZ.............',
'..................ZLBAJTZ.................................................................................ZTZ.ZLJTZ............',
'..................ZLBBLZ...................................................................................Z..ZLDLZ............',
'..................ZLBAJTZ.....................................................................................ZLBLZ............',
'.........ZZZZZ...ZTJAxDLZ..........ZZZZ.....ZZ................................................................ZLBJTZ...........',
'......ZZZTLLLTZ.ZTJDxuBLZ........ZZTLLTZZZZZTTZZ..............................................................ZLBDJTZ.....ZZ...',
'.....ZTLLJDBDJTZTJDxstAJTZZZ....ZTLJDDJLLLLLJJLTZ.............................................................ZLDxDLZ.Z..ZTTZ..',
'.....ZLDBAxuxDJLJDxsorxDJLLTZZ.ZTJDAxxABBBBBAADJTZ............................................................ZTJAAJTZTZZTJJTZ.',
'.....ZLButrosxABAxsolosxABDJLTZTJDxtrrtuuuuuxDJTZ..............................................................ZLDxDJLJLLJJTZ..',
'.....ZLBuoooortutrooooortuxADJLJDxsooortututAJTZ...............................................................ZTJAxABABBBLZ...',
'.....ZLBuuuuuuuuuuuuuuuuuuuuxABAxuuuuuxABABADLZ.................................................................ZLBuuuuuxDLZ...',
'.....ZLDBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBDJLJLJJTZ.................................................................ZLDBBBBBDJTZ...',
'.....ZTLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLTZTZTTZ..................................................................ZTLLLLLLLTZ....',
'......ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ.Z.ZZ....................................................................ZZZZZZZZZ.....',
'...............................................................................................................................']};
const ZEUS_G = {cols:152,rows:182,s:0.05275,fr:[-0.591,2.400],kr:[-0.750,-0.492],pal:[0xfbf3ac,0xf6f3ab,0xf5eda9,0xf8ea93,0xebe2cf,0xe8e2ce,0xf1e2aa,0xe7e2c8,0xecdcb7,0xf4d56b,0xe2dcc9,0xdad3b0,0xf1c650,0xf5c03a,0xf8be2f,0xfabb30,0xf4bb34,0xf2b434,0xcbc5b4,0xd5c37e,0xd6b355,0xb9b8a2,0xb1ae99,0xdda43a,0xd89430,0xbaa35f,0xb89545,0xc7852f,0xbf7628,0xbb6924,0xa5a187,0x989b85,0x9c8c54,0x848878,0x8f7f56,0x96703a,0x727561,0xbd6523,0xbc6522,0xba6522,0xbc6323,0xa5612b,0x795732,0x5b563f,0x405759,0x3b4139,0x233230,0x082934],
 c:['.............................................................................................................................Fv.........................',
'..........................................................................................................................v..zJv........................',
'......................................................................................................................sERTK...zt........................',
'................................................................................................................f....ltxAQH..luu...Es...................',
'................................................................................................................efffktAxAI...ljus..RKv..................',
'................................................................................................................ehhhguuuAQ..sjjmt.HQTQv.................',
'................................................................................................................kkhiduAAAGRRRzjxzsKQQQG.................',
'..................................................................................................................FstuxzAAJQUQjmAIRQQQQF................',
'....................................................................................................................zGAAAGGITRjrAQQQQQQR................',
'...................................................................................................................EtAxxxzJJRTAJJKJJJJQQv...............',
'...................................................................................................................EuuuuzzGIQTJQQGGAAJQJEffk............',
'....................................................................................................................uxzF.....zAQIzGGAAAAGkhee...........',
'...................................................................................................................Iuz......IuAQ....GABAzskef...........',
'...................................................................................................................ItF......KQGJI....GAAAK.vk...........',
'............................................................................................................................FztdtG....GzA...............',
'............................................................................................................................lbbcmA.....II...............',
'............................................................................................................................dcajnB......................',
'...........................................................................................................................wmmmnrC......................',
'...........................................................................................................................FxroryD......................',
'......................................................................FF...E................................................JBmxDJ......................',
'....................................................................tuddzzjztt...............................................zdmJ.......................',
'..................................................................tztmmmummGumttE............................................tdmJ.......................',
'................................................................FjmuAAxxAAAAAAmmd............................................tdmI.......................',
'...............................................................KjmAJJQQGJQQBGRGxjt...........................................tdmG.......................',
'...............................................................tAGKRIIEsvvswEGIJuutI.........................................tdjG.......................',
'...............................................................uGRKwsfehefeihlsGJAuA.........................................tdjG.......................',
'..............................................................zuBJwigglieeittlilKJAz.........................................tdjG.......................',
'..............................................................GJJIltzzzvlkvEEwtlEJuu.........................................tdjG.......................',
'..............................................................GBQFwwvvwvslvwvvwvwRJuI........................................tdmG.......................',
'.............................................................IABIwwwvvwvlkvEvswwwHJuG........................................tdjG.......................',
'.............................................................GAQKwwwvssvvvvssvwvvFQAz........................................tcjG.......................',
'.............................................................GJTHvkhffkvHHwskehksEJAz........................................tctG.......................',
'...zAv.......................................................JJRFshfhkvHKKKvshheswIxG........................................tlis.......................',
'...ACz.......................................................GxBFsksvvEHHHHEvvslsvzxG........................................tglfk......................',
'..FGJJF....................EF................................KABIwvwwttzttAutwwvvtuAI........................................tcllek.....................',
'..FJPPG......H............EAA................................FIuuEwvvtQQRRRRItwwwtzIF........................................tdjzlek....................',
'..GBPCCI....KRK...........ADJ...............wttzR............FGujjtttzHFwwFHRzwwzmuGE.............zztw.......................tdjAElfs...................',
'..GCDDDG...KSSKR.........GJPJ................vswHFE.FFFFFFFFFEIzjdjutGEEttwwKzzuujuJFHFFFFFEEEwwwFwsvE.......................tctzFwss...................',
'..HJPNDJH...KHK.........ICDPA...............EkesElkkkkkkkkkkklGzttdtuJztjjjtGAjuuzAIEllkkkkkkkkkkwvfkw.......................lhiekvHEw..................',
'..HJDNPPz....I.........HJNNCA...............wkhtEliiiiiiiihiilGttuzuxummmjuztAAtuuAJugiiiiiiiiiiiEEhhw......................skssskkkwv..................',
'...JPDPCBG..GI..F......APDDCG...............whhzKKKKKKKKKKKKIzItttzuxjjxxAuGuuxjjnATGttIKKKKKKKKKKFhfw......................svltEwskffs.................',
'...IPPJBCGKHG..ztuG...zBPNDJG...............wehHUVVVVVVVVVVSEtKuujmmrjjquGzuAunjjnxQJuIUVVVVVVVVVVKifv......................HlcgzHEvlhs.................',
'...GAJABAJQGJ..zzzG..GBBPPPJ................vehIUUUUUTTTTTKtduRAxumnxnmuJJuuBqxxnxARJmlHSUTSSSSSSSKlesI.....................vhffhkkkklw.................',
'...GxxAAAJJAJ..zuzGKGAAxJJJG...............IselKSSSSSSSSSSFtjuJJxxnnBxrAQPBPJxJJBJRTDmdcESSSHHHHHKRlelH.....................kkkkefffhsw.................',
'...IAxAxBAABA..GuAQIAAAAAAuF...............IlelKSSSSSSSSSSHGzuAQQJyBCDPQRPDPQPPPPQRJCyjjzSSSHHHHHKRlhkF......................FFHHFkekvvv................',
'....GuAxAAxJAzEttJKAxAyyxxzF...............FlekSSSSSSSSSSSSSHtAQTQJQNDPPQPPPPPPJPQTACCmjGSSSHHHHHHSlekE.....................skkklskevEls................',
'.....AAAAAxJQQzutAArxAxAxAG.................kelSSSSSSSSSSSSEguJJRQQJPPPNQQJQPPQPPQQAAQAtQQJRKHHHHHSshkw.....................ssllkkksFEkk................',
'....KAxxxxAGQIGGztmxzAAAuz.................vkevTSSSSSSSSSSEgjmGJQTRJQQRJJPQRJPQGITJBxAzQRDPRKHHHHHSvikv.....................KtgtzwwFHElk................',
'.....GxAxxzAJJIIGGABAuAuz..................vkhtTSSSSSSSSSKtjxAJACQKwwEHGAGKHEwwvHUPCAuATTPDQRIHHHHREhkv.....................KjbjAEFHHElk................',
'.....KAxAAAAAQRFtzJQJAAuG..................wkiETSSSSSSSSSRGuBQAyLQFsvsklsssksvsvHQCBAuGEKQNQJBJKIJPBlevH....................KjbjyEFHHElk................',
'......IzxAAAGQFtjuARQJGG...................veiFTSSSSSSSSSSRJPQQPLJwkslehffeesskwFuxyrmujHQDRJxRTAyCDAisH....................KjajBEEHHFsf................',
'.......KzzutzzztjuAIQRKGH.................HseiHTSSSSSSSSSSSKAuJQPQFlksehkehksltKRxryAjjzRPPRJGTGryzzAtlH....................KjajBEwHHFvk................',
'..........AAItGIJJQAJAzGz.................HlhiKTSHFvvwFHHFsstuzJRTHwsssfffksvtmATAyDJzuAJDPRJRQxBtheillF....................KjbjBGwEHFvks...............',
'.........AxAzIzuQJGAJJKI..................EkhlIHskffhffkkhitAxBIFFHHHKKFksHKIunATJDCyAAjtBQRTTAyzkehhehv....................IjcjBIwwFFvks...............',
'........HurxGIduAtuJJAF...................EkhhikfeeeeffffelIJAyAvffkkksKHFRvlmmARBLCxAujzPQQTQxCvefhefek....................HjcjBtvwwwwsk...............',
'.........zAGztdmxtuQRE....................EkheeehfhhkkeefelFTRAyzlfeeefvHHwkgmdFRxyDyAxAQQRJRABIshfffhfhk...................Fjcjytsvwwwss...............',
'.........KKzztdmuurCI....................FvfefeeeefkssfefehkwGGyAvheehhfsvlfgmdtTJxACBARRQRJJAPIkeefffhfe...................Fdajythsvwvvw...............',
'..........zuQujnujrxz....................vkfffeeefkvvsffffhcjuAAAsheehhfsvkegjdjIUJuQQRRRTRAJBQHlhhkfkfeek..................Edajythkvvvw................',
'.........tmAQAmnumxxz....................kheefeeekswvleffhgjuABzlhhheeefsskeijdduRTAJQRITUQxJBQKvvvvvvvsslsv................EdbjBtfswvww................',
'........EttKIGtuzmyyz...................sfeefheefkvwvkfefitBQQBzkhhffeefssfhijdamQUJCQGtKUJxJAQTKKKKFslkfheffks.............tdbjBtkvvww.................',
'........zARRQIuuuxBPI...................keeefheekswwsffeeelAJQPClhffffefssffhgjcjJUIBPJuGTJxQARURHvsffeeeeeeeefkv.........wkddcjytswww..................',
'.......ExAQRJumAumBQI..................sfffeeeefsvwvkeeeeeftzzCzlfffffekvsffhgdcdGUKJRTQPDyJTGTKwvkfheeeeeeeeeefks.......vkeddbjytvww...................',
'.......unxGJxmuJumAQQF.................khfeefkksvwvleeeeehfkiltlfffeffekvvffeiddduTURRTQBBQUQIUUHwslkffffeeeeeeeefs.....sfheddbjyzwvw...................',
'......EtAuAynmuIuuARQFE................feheehlvwwvshfeeeeffhffhefeeeeeekvvkfehgjdduIyrxxJTURARVUTHwvslkefffeeeeeeekv...kfeeeddbjyzww....................',
'......tGIGJmmtuGuJGKQJE...............sfeehksvwwHEshfffeeefeeeeeeefhfefswvkeehigjddjjjARRQJARVVSSTKwwvskfhhffeefeekvwwkfhefeddajyzw.....................',
'.....zuzFHKtlFEvzJAQPAz...............kekksvwwFSUHvkfffeeefeeeeeeefffksvEEsffeehjjdabtQQBxxKSVVUSKTSFwvvslkkeeeehksvwsfffefeddajyzw.....................',
'....HAutvFwkFwsEsszQCAz...............ksvvvwwHSVVSwshfffeefffffeefklsvwwFHwskfeeigmjduCxnxJHSVVVUKKSTKFwwvvvssssssvwwskfeeheddajyz......................',
'.....K.vwFkvFlFvkkFRJGGF..............vvwvwwFHSTSUHwskffffhkkklsssvvwwwFHHFwvvskkilunrrnAKHSUVVVUTKHKSSFvvwwwvvvvEwwwleffefeddajyG......................',
'.......sHsswwvEvslI..RR...............wvvslksESSKVSFwvvsvvvvvvvwwvwwEFHHHHHFwvwvvvwwunnzIHSVUUVVVSKHHHKHFFEwwwFHKKwwwseffffhddbjyJ......................',
'......vFHvwFvwFwvw....................skfhfkvFSKKUVSHwwwwwwwvvwwEFFHHHHHHHHHHFFEEwwwEzzIKUVSKKUVVVSHHHHHHKTSSSTSKFwvwvskfekljdajyJ......................',
'..wssFwKHvEHvwHFvv...................seeheekvFSKKUVVSHFEwwwEEFHHHFFwwwwwHHFwwwEFFHHHHKSTTUUKHKUVVVUKHHHHHHHHHKHHHHwwvwwvvsvvtdajyJ......................',
'...w..wKKwwKwwFHvv..................sfhehhhswHKHKTVVVTSSSKKKHHEvskkkeefkwwlefeekksvEHHKKKTSHHKVVVVVSHHHHHHHHHHHHHHHFwwvvwwwwtdajyQ......................',
'...FFHwHKwwHFwEKwvsv...............vkeeeeekvEHKHKUVTSTVVVUSKEskffeeeffkswwskfffeefhkswHHKSKHHSUVVVVRRKHHHHHHHHHHHHHHFEwwvvwEudbjyQ......................',
'......wFHwvHHwwKwvlkk..............keeeeefkvFHHHKUUKHKSUSHHvkhhhkklsvwEFFFFEwvsskkfffksFHHHHHSSSVVUQQURIHHHHHHHHHHHHHHHHFFHHzdbjyQ......................',
'......wwKwwHHvwFwvvskk............vehefffhswFHHHKVTHHFFKSHskfkksvEFFEwwwwwwwwEFFEvskkkkswwwHHHHSVVUPQURJJKHIHHHHHHHHHHHHHHHHudajyQ......................',
'......wwHwwFFwwwvwvvvkw...........keeeffekswHHHHSVUKwksvFFvvssvwFwskkfekvvseffkswEwvssvvvvvskvKUVVTPPUQLPRRJIIKKKKHHHHHHHHHHudajyQ......................',
'......wvwwvwwvvw.wvvwss..........FffeefffkvEHHHHTVVSEkeklssvwwwwskfeeefksvkeeeefhlwwwvvsslkekETSUVTPPTPDDQTPQARRRSSSKHHHHHHHudbjyQ......................',
'......FvvwvwwvE...wwwvs..........vfkffefkswHHHHKUVSTKsfheffsvwwsefeeeekfsvleffffeelvwvsfeefesHKKUVRNPRPNDQTPQAQRQTTSSSKSSSKKudajxJ......................',
'.......E...........wvvsv.........seeeeefsvEHHHHSVVSKKFkkeeelvwvkfeeeeffkvwsfffffffkvwwsefefkvFHKUVQNPQPNNQRPQAQQJTUSSSSSUSSHudajxJ......................',
'...................wvvvs.........kehefksvwHKHHHTVVSFvEEsllsvwFvfffeefkkswwvslkkffefsFwvsllsssswSVVQNPQNMNQQPQAJQPTUSSSSSTSSKudajxJ......................',
'....................wwvsF........vlkksvvwFKHHHKUVVTFkfkkkksvEFvfffksvvvwFFwwwvvslkksEEvslkkkfkFSSUPDPPCDDQQDQAGQPTUTSSSSSTSHudajxJ......................',
'.....................wvsfswFvssvwvwvvvwwFSKHHHSUVUSKvkkfehkvEFvssvwwwwEFHHHEwwwwvsvwEFvfffefkwKKSRPNPPByBQQDJJAQPTUUSSSSSTSHudajxJ......................',
'.....................EvsfefffffhfksvwwFKTKHHHHSUVTKKEvvssssvEEvvwwEEEEFFHHFFEEEEwwwwwFwslssvEHHHSQPPPDxrBQQCJJAPPRUUSSSSSSSKudajxJ......................',
'......................wvskfhfeeeeefvRTUTKHHHHSTUVTHEFwvvwEFEFEwvvvskkkksEEskkkksvvvwwFEEEwsvwwEHSQQPPCrrBQQBJGxPPTUTTSSSSSSKudajxJ......................',
'.......................vvvskfeeeeefhvSVSHHHHSTUUUUHssvskkwFHHwvvlhfefefkssfeefeehlvwwFHFwlfsvssHTQQJPBqrCTQyJJxCPRUTUSSSSSSKudajxJ......................',
'.......................wwwvvvsssslkhfwUSHHHKUUUUUUHsfllfelwFFwvkeffeeefflleeeefefelvwEHwlfkskfsHTQRPPBqrPTJyJJxBPRUUUSSSSSSKudajxJ......................',
'........................EwwvwwwwwwvskkHKHHKTVUUUUUKshfhffksEwvskhffeeefelleffeffffkvwwEskefhhesHURTPQBqxPTPxJAxBPRTUUTSSSSSKudajxJ......................',
'..........................wvwwvvvvwvvssHHHHUVUUUTUSwlhfffekvwwskeeeffeffsskfhffffeksvwwlfeefekvSUTTPQBqxPTDrJAryDQTUTTSSSSSKudajxJ......................',
'..........................HFwvvvvvvwwvwHHHIUVUUUUUSFskfffekvEwskeefffkksvvskhfffffkvvwwkheeffswSVTTPRBqyQRCrJGqyDQTUUUSSSSSKudcjxJ......................',
'....................EEEEEEEHHEwwvvvwvwHHHFGUVUUUUUTHvlfffekwFwvsklsssvvvwEwvvsssllsvwFEkfeeflvwKVVRPRCryQQBrJJnyDQTUUUSKHHHFudcjxJ......................',
'...................vEwwwwwlHKHHFFEwEEHHHHwGVVUUUUTTHvsfffekwHEwwwvwwwEEFHHFFwwwwwwwwEHwkffefsvwHVVRPTJryQQBrAJnxDPTUUUSsvwwtjcadxJ......................',
'...................vwsssvvtSUKHHHHHHHHHHElIVUUUUUTSFwsfffekvHHEvvssssswFHHFwvsssssvwHHwkeeefswwFUVRPTQyBQQCrAQrrDPTUUVTvvvsljcadxP......................',
'...................wsfeeegtTVUKHHHHHHHHFslKVUUUUUUSwwseeffkvFFvlhfffffkkEEskeeeeeelvEFvkeefeswvESVTPRTDCQQBrxQxrCDRUVVUviffgjcbjxP......................',
'..................wwkfeeeitUVVTKHHHHHHHshtRVUUTUUTHvvseefffsFEskfeeefeefsseeheeeeffswFsfeefelwvvSVTPQUJBJGujjztmyDRVVVVGgeegjcbjrC......................',
'..................zEkfeffiwUVVVTKHHHHHvfhtRVUTSSSSFwvlheffesFwsffeeefffellehhffffffswFsfeeeekvvvKUTGzwldcccbabccdtIUVVVJteegjcbjrC......................',
'..................zwhfeehgIVVVVVTSSKHwkeetRSHwvlllggliheeeeswwvkkkfffffkvvkffffffkkvwwsfeeeekvvvvwlddjjjdccdddddbcgvKUVQthhgjcbjrC......................',
'..................vvehhehtQVVVVVVVTTIticbctlbaaddjjddcbbbihlvvvvvvvssvvvwwvvsssssvvvwwsfefeeiggdjmmnnqommmmmmmmmmjdcgwSRuifgjcajrC......................',
'..................wseffehtRVVVVVVVUKtccddjjddddddjmmnmjdcaailsvlkklssvvvvwvvvssslllvvwvkhicddjmnoonmmjjjjjjtzGGGGAumjdgttiegjcajrC......................',
'.................EEkefheiuTVVVVVVTFldjmnqoonnnnnnmmmnnqnmjdabccbihhhhhhlvvlhheehhehsvslccdjmmnqppnjjddbabcaacggvFRRQJxmjdghgjcajrC......................',
'.................zEkefheguUVVVVVSwdmnnnnnmmmmmmmnnnqpoppqnmjddaaaabbihhhllhhhhhhhhcccccddjmnopoqnqxxuujdbabbaaaabgvHTTJxmdcdjcajrC......................',
'.................zEheffegAUVVVVStjmmjjdddccabadddjjjmnqoponmjjjdddcaaaaaaaaabbabbaaccddjmmmmnnxAJGzttddddddddcaacjjjtKURCrmmjcajrC......................',
'.................zvfhfefdGVVVVSvcdddbbadjjjjjddcabaaddjmmnnnmjjjddbbbaaaaaaaaaaabddjtzAujjjuAJJztdddttztddjjjjddjttmnnARTJxrjcadrC......................',
'................GzsfhfehjJVUKFlccdddddccddjmnnnmmjdbbbbcddjmnqrxzztttdddddddddjtuzJJJujdduGRQztjmmnAGElbbbbccddjmuGJGBxxQTQymcadrCI.....................',
'................GGleefehjQUFgbcdjmnnnnmjjdddjnopponjdcaaaabddjmmxAJQRRQIIIIIQQRTTRJujddtITRAnnqoqxJKlbaaacaaaaadddmxJRQBxJTJjcadrCI.....................',
'................zEkfefehuRSlddmnnmmjmmnqnqnjjdmqoopnmjdaaaaacbcdjjmuAAJRTTTTTTQJxmjddtGTUQuqpopnARHlbaaabbaabaaaabdjmAQTJyQJjcadrCJI....................',
'................zEfeefeiuTKjmnnjdacccdjmoorrmmjmooppoonjdabcdjjddcdddjjmuuxxxrqnjdcduJUUJroopouJTKiabbaaaaaaaaabaabcjoxQTQCBjbadrCPDK...................',
'................zwffeeegzUImpomdbaaaaaadjmnAJGxrqqoppppnmjdddjnonmjjdddddddjjjjdddjuRUUGrpoooxQUSlbabaadjjjddddbbccbdjnrJTQyjbbdrCQOPR..................',
'................zsfkfehgAUGqpmdaaaaaaaaaadjmxQTTJAxqnooonnnmmmnppqnnnnmjjddacddjmnATVUGoqqoqxRTTHbbbadjnooonnnmjdjmjjjoqrQTBjbbdrCQPLP..................',
'...............zzsfffehdJUGpnmdaaaaaaaaaabadmqAQUUTQAxnnooqnoppooqnmjjjddddjjmnrxJUUTJrooonARTQRvaaadmqppoooopomjmooqqonnuRJjbadrCQQPNQ.................',
'...............zFkfffeitJUJpnjaaaaaaaadddbabdmorAQUVVTQAxqooqppppoqnnnmmmmmuAJQRRRJAxqpqqxGTTQRKgaadmqrrpooooqqqqoppryqpqnJJjaadrCQQQDP.................',
'...............zEffffeitRUJrndaaaaaaacjnmjdccjnporxJTVVUTJAxqqqooopppnnryJJQQJJAxrrpooqxARUTJPTEbbdmqxBypoooonnoppppryxoooyAjaadrCQJRQCJ................',
'...............AwffffeiuTUJrndaaaaaaadmooqmjjjnppoorxGRUVVUTJAxnoooooooqrrrqqqonnqqqxAITUVTPDQTsbcmoxCPxqppppmjnoooopyBqoqyyjaadrCQQQTJyPR..............',
'..............GzveffefiuUVQrndaabaabbjnooooooqpprqoqpqrARUVVVUTQAxrnnqoonnnqqqrxxAJRTUVVVTQNPUSlajqrBPJnopooomdmpoppqyDyooyyjaadrCRTPQRxyPR.............',
'..............zGseeeefgAUVQxndaddaabdmooqppppppqyyrpoooryJQTUVVVVUTQJGAAAAAJJQRTUUVVVVVVUQNPTVSgdmqyDQJnoppppmdjpopppyPBrpyyjaadrCRUQPTJxBPQ............',
'..............zFkeeeffdGVVRxnjjmmjabdnpnqppppppprCCyroooqyCPPRTUVVVVVVVVVVVVVVVVVVVVVVVTQDPRVVHcjnrCPTGqoppppjcjnppppyQPxrByjaadrCQTRNQTArBDR...........',
'..............uFkeffehtJVVRynnnoomjdjnpqooopooooqyDDCBxrppxCNDNPQQRTUUUVVVVVUUUUTRRTVVTPDPRUVUvdmqyLQUApopprpjbdnppppxQQByDyjaadnCQRTPP..xrCP...........',
'.............IAwfhhhhhtRURPBroqrrrnmnqppoorxrpooorCMLNDCCByCNMMLLLNPPPPPQQQQPPPPPQUVVTPLPRUVVKgjorCORTxoopoyrjadnpppprQQDLDyjabdnCQQUQDQ.JrxCQ..........',
'.............GzviiiiiguQQDLDByBDCyroooppoqyDBxrrqrxCDDLOOOLDNMMMLLMMNNNNNLLLLOPQTVVURPDPRUVVUwdmpyDPTTxpopqyrjadmpppprJTPMDyjabdnCQQTTNN..GryP..........',
'.............zAuuuuuuunxxxxyCMLLODBxnqppryDNNDDCCBBBDOLLLLLLMMLMMNNDDMMLLMLDJQTVVVUQNNPTUVVUKgjnrBLJURrpoprBrjadmppppqBTQDDyjabdnCQQQUPLQ..JuBR.........',
'.............zIFFHHFHGnnoonrCLLMNLMMCByBCDDLMMLLODNMLLMMMNNNOLLLMMMLNMLNDDPQTVVVVTPNDPTVVVVSldmpxDLQUQqpporCxjadmppppqyRRDDyjabdnCQQQUQLP...RJ..........',
'.............zEkfhfeijqooorxMMLDLLLLLLLLMLLLLLLLLLLLLLLLLLLLLLLLLLODLDDPQRUVVVVUQPNNQTVVVVKlbjnqBDNRUJopnorPxjbcmoppppxQTPDxjabdnBQQPTRODR..............',
'.............AvhhhhijooqqrBDLOLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLMMMMNNPQRTUVVVVVURPNLPQUVVVUKladmnxCDPUUAopqpxJxjbajqppporJUQDxjabdnBQQPRTPMQ..............',
'............GGsefhijnopryDCCCDLMLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLMLPRUUUUUUTQPPNDPRUVVVUKladjqrBDOQUTxnoopyQxjaajqppporCTRDxjabdnBQQDQUPMP..............',
'............GGkeeegnoqryLDyqryCNOLLLOLLLLLLLLLLOLLLLLLLLLLLLLLLLLPQQJPQQQPPPQPNNJTVVVVUFgbadnqyMDNQVRxnooqBQxjaajnoppqrBRTDxjaadnBQRNJUQDM..Q...........',
'............zFkeehjoorBLLCrppqxCNOOMNOLLLLLLLNLONMMMMLLLLLLLLLLMMDQTUTTRRTTRPOPQUVVVVTEgaadmoxDNLPTVJroopqBQxjabjnoooprBRUJxjaadnCQRNBTQCLP.TJ..........',
'............zEkeehjnpxDLLCrpppprCNLNNMLLLLLLLDDLDNMMMLLLLLLLLLLMMMLPQRTUUTQPPQUVVVVVSvbbbcjnrBOMLQUUAqooprCQxdabjnooopqyQUQxjaadnBQRNyRRBLP..PJ.........',
'............AwiiiidnoxCLMBrppppprCNDMMLLLLLLLDPPDMMMMLLLLLLLLLLMMONNLDNPPPQRTVVVVVTHlccccjnryNONDRVTxooopxPRxdaajnoooppyPUTxjaadnBQTPyQTxCDQ.QCG........',
'...........EuummmmmnorCLNBqponqoquBDLMMLLLLLLNPRQONLMMOLOLLLLLLMMMNPPQQQRTUVVVVVUKvccddcjnryDDNDPTVRxqoppyPRxdaajnooopprDTUAjaadnBQTPxJTxBOP..Ny........',
'...........HJJJGJJJAnrCLNBronjmoqmtANLLNDDDMDNNRTPDLMNNLLLLLNLLLLMDPQQQQQQTUVVUREgcdttcdmqyDNNNNQVVJqqppqBPTxdaajnppooprCRUAjaadnBPTPxJTAyDN..QCu.......',
'..............HEFKSTxqBMDBromdjnondduCDLLLDNPQNPTTQDLLLLDMLLLLLLLNNMDDNDPRUVURGgcctGEcdmqxCDODMPTVUAoppprBPTudaajnppooprCQUAdaadnBPTPxAUJrCNR.QDyu......',
'..............sehsFTAnyDMCromddmonmdctACLLMLPTQPQUUTQPNMMLDLMLLLLLLLMMOPQTRQAtccgzKEcdmqxCDLLDNQVVRxoopprCPTudaajnppooprCPTAdaadnBPTPrAURxBLQ..PCxE.....',
'.............wsffsFQBrrCNCromdbdmnojdbctANMODQTTRUVVUTQPPPPDNDPPPPDLLLLLPDCudcctIREgdmnrCNNLMNPTVVIqooopxDPTudaajnopooorBPRAdaadnBPTPrAUTxyDPT.QLyu.....',
'.............wkhhvHJCxryNDxondbadjqnjdabdzCLDDQTVVVVVVVVUTTTRRTTTQDNNDNMCAtccdzRTEcdjqrBDOLLMOQVVTAopqopyMQTucaajnooooorBPQudaadnBPTPxxTUArCDQ.ROCrz....',
'.............vkhkvKJNBrrCDBrnjbabdmonjdabctADNLPRUVVVVVVVVVVVUTRJOOONDDAtgcduJUTEcdmqrBNMMOLLPTVVQnoqnorBMQRucaajnooooopBDPxdaadnBPTPxxTVQnBMP..PLyu....',
'.............skhkvKPDDyqxCMynjcaacjnpnjdbbcduADDNPQTUUUUUUTRQQPLNNNDCAtdcdtJTVTEcdjnrBDDNLLOOQUVUAqonoorCOQRjaaajnooooopyDPxdbadnBPTPxxTVRxyMP..QNCu....',
'.............sfhkwSQNMCrryDCxmdaaadjmnomdcbbbgtxCCDNPPPPPPNNMMLODCAudccduITVVTEbcjnryDLMOLDLPTVVRrpqoooxDOQRjaaajnooopppyDDrdaadnBPUQxrRVUArDDQ..PNB....',
'............wsehlETQByCBrryCBndaaaaadjoonmjdabbcdttuABCCCDCCCBAutdcddtGRUVVVTwbcjnryDDLLLDNDQUVUAppppppyMLQQjaaajoooopppyDMxdaadnBPUQxrRVVJrBMP..QNDF...',
'............wkfhsFTKxpxCBrrxBrjaaaaacjnooponjddabaaacggdttggdddddtzGRTUVVVVTwcdjqqyDLLLLLNMPTVVJrppppoqBLNQJdaaajoooopppyDLydaadnBPUQyrRVVRryMP...PP....',
'............vkffsHUKmoprCBrprrmdaaaabjqooppoonnmjdddddcaaaddjjzGQTUVVVUUUTRwcdjpryDMLLLLLLNRVVTxnpppporCLNQGdaaamoooooppxDLBdaadnyPUQyrQVVTxrCMQ..QQ....',
'............vkfhvKUKuoopryrqppnjaaaaajoonooooooooqnnnmmmmmmnorAJQRRQJJACPAtcdmnoyDMMNLLLLLPUVUAqnpppporDDNQGdbbamoooooppxDLBdaadnyPTQyqJVUUArBLJ........',
'............skekvSUSAqoopqooopojaaaadmopoopppppppppppoorrrrprppqqnrrxyCNAtadmnqyDMMMMLOLMNRVVQroqppoppxDDNQzcbbcmpooopporDLCjaadnyPUQyrJUTVJqyDP........',
'............sefkwSTSAonomjmnopomaaaadmopoopppppppppppoprBCCBByyyyBCCLLCzdadmpryDMMMMMNLLNQUVRxpoopppppyMNDQubbacmpppppqorCLDtaadnyPTRyqJURURxrDLQ.......',
'...........FseflETSSAoqnjcdjnqqmdaaadmopoopppppppppppoonryDNDLMMMDDDNCugcjmoryDDMMMMMMMDPTVUAoonnopporBMNOJultttzAxrqooorCLDuaadnyPTRynAUQTUArBMP.......',
'...........wkefsFUTSAorymdabdjmmdaaadmoooopppppppopppoooppxCNMMLLLMNBtcdjnnrBLLLLMLLMMMDRUUJqpnmmnppprCMLPQRTQIHKUUTJAunrCMMucadnyPTRBnAUQQUJnyMPR......',
'...........vkehsHUTSGqrCBjdbbbdjdaaadmoopooppppppoooooppppprCMMLLLDAtbdjnorBDLLLLLLLLMDQUVRxqonjjnppnyNMLPTVUQIHSVVVVVUTQJPDAcadmyPTTBpAUQQUQrrCDQ......',
'...........vkeksHVSSGqyDNBtdbababbaacmooopppooooooppoppppoooxDDLNCugcjmoqxCDDLLLLLLLLLPTVTxqnomdjnpprBNDDPTVUQIHTVVVVUVVVUTQGdadmyPTTBpAUQPTTxqBOP......',
'...........shekvKUSTJnBMNNCudcabbaaaajjmnooooqnnnqnnpppppoprxCDCAtcdjnqrxCNDNLLLLLLLLPTVUGqoqmdcjooprCDNMPTVUQIKUVTRQQQTUVVVTladmyPTTCrxTRNQUAoxMDR.....',
'...........seekwSUSTJrBMDLLNCutdbbaaabacdjjjjjjjjdjmoopqrxyCDPCtgbdmnpryDMNLDLLLLMLLPRUUJrqpnjbcmoopyDLNNNQUUJIKURDMNDNPJQUUTladnyPTTCrxTTOJUQrrCMQ.....',
'..........wlhhlwSUSUKrCLDLLLLDCButdcbaaaaaaabbbbbdjnprxyCDNPQIlcdjmpprBDDLLLLLMMMMDOQUVQxoonjdbdnoorBMLMMMPTTJHSUPLNLLLLONPQGcbdnyP..CrxTTONTTxryLP.....',
'..........wkfksETSSURxCLDDLLLNNNDCCAuttddcbbbaacdmxyBCMDPQRREgcdmqopxCNNMLLLLLMMMLNQUVRuoppmdacjooorCMLMMNLQRJHTUPDPPPPPPQPxdaadnyP..PrrRTPNQUApxDDQ....',
'.......FwvliiilsEEwFEmBLDMLLLNNMLLMNNDDCBAzuuuzACCLNPPQTUTHlcdjmqoryCNNLLLLLLLMMMDPUVRxoppmdbadmoopyNLLMMNLDPJKUUJPTUUUUUUJmdaadnyN..PrrRTPDPUJqrBLJ....',
'.......wHHFFHHHFwsHHHuyLNMLLLLLLLMMMLDDDNDDNNNNNNPJQTUVUKlccdmnoqxBNOLLOOLLLLDLLDJUUJxopnndabcjqoorCDLLMMNDLDIKVUQTVUTUVTJBmdaadnyN..PrqQUPDDRTxqyLP....',
'......FFsskkkskklwvsltrCNLLLLLLLLMLLLOMMMMLDPPQQTUUVVUKvcbdjnppryDMLLLLLLLLLLDNLJTTGnooqmdcabjnpooxDNMMMMLNMPISVUTVUQPRUQNBmdaadnyD..PxqJUPLOPTAnrCNQ...',
'......EEkeeeehfhdFsfegnBDLLLLLLLLLLLLPPQQQRTUUVVVVVUKvgbbdmqqqxCNMLLLLLLLLLLLMNQTQuqoonjdbbadmopqqyNMMMMMLDNPISVUTVQNDRTPDBmdaadnyD..PxpGUPLNDRJroyDJ...',
'......zEfhhhheeilFlhfimxDLLLLLLLLLLLLNPQTUVVVVVVVTKvcbbcjmppryDMLLLLLLLLLLLLODPRJrqqpnjdabbdmqonqrCNLMMMMLDDJKTVUTUPLNRRPQJmdaadnyD..PypAUQDNLQRxorCP...',
'......zwhheeefehiFkhfhjrBOLLLLLLLLLLLNNNPRVVVVVTHsbbbbdjooryCLOOLLLLLLLLLLLLDPQAqqoomdcabbdjqoonqyNLLMMMMMDPIKUVUTTPODRRTVQmdaadnyD..QyoAUQMMDPRGnqyDQ..',
'......wsfeeeehhitFkeehgmrDOOMMMNNNDDMNNLPRVVURElcaaacjmqrxCNNLLLLLMMMMMMMMMDPJxqoqnjdaaabdjnoooprCDLMDDNDJIIHKVVVUTLLOQUVVQmdaadnyNR.QyqxTRMNDOPQrorCP..',
'.....FEkhfeeefhguEfhefhjqyDNNDLMNNMMMNNPQUSHvcbbbbadjnqxBDNNNMLLLMMMMMMMMLDPBrqpnmjcaaaadmopoooqyDDPJJJIIHHHHSVVVVTPMLQVVVQmdaadnyDR.QBqxRRNDLDPQAqpBPR.',
'.....wFkehhhhhedzwehhhhgmryDDNNNDNNNDDPQHvlcbabbbdjmqryDNNLLMMMMMMMMMMMMMDDyqopqmdcaaadjnooqrxxAJIIIHEEwwwEFHSVVVVUQOLQVVVJmdaadnyDR.QBqnRRDDLDDPPqoxDQ.',
'.....zzjdjjjjjdmutjjjddjmnqxyAzuuuuuutlicbbaaaadjmqryCMOMMLLLMMMMMLLMMNMDBxqqqqmdbcddjnnrxAJ.......wvvsslsvwESVVVVVUQDQVVVJmdaadnyDR.QBrqQTPDCxryCrorDP.',
'.....AGAAAAAAAAxAJJJJJJJJAnpmdaabbbbbaabbaaddjjmnryCDLLLLLLLLMMDLLLMMNDCyrpoooonmmmnxAJQ.........EwsskfeefvwwTVVVVVVUQQVVVJmcaadnxLQ.QCroJTPDBqoqyypqBD.',
'....KGHvwwvvvvwu..........BrqjjddddccccddjmmnnqxyCDDDLLLLLLLLLLLLMNMMCyrpqrooooqqxAQ............HvsffeeeefvwFUVVVVVVVTTVVVJmcaadnxDQ.QCroATPDyqopryrpxDR',
'....GGsffheeefiu..........QCxrrnnnnmmmmnnnoqryBCDNNNNLLLLLLLLLLMDDDBxrppqppqrxAJ................FvkeeeffekvwHUVVVVVVVUUVVVJmcaadnxDQ.RCroATPDyoopnxxprCQ',
'....GIkheeeeeegA...........JDDCByxrooopoorxyDLLLMMLLLLLLLOLLMLCCByrrqqoorxAJ....................wsefeeffelvwHVVVVVVVURUVVVJmcaadnxDQ.RDxpxTQLxoonprxrnyQ',
'....AHkfeeeeeegA...........QNDDDDDCxnqqryCDNMMMLLLLONNNNCCCByxrrpnnnrxAJ........................wlefeeeeesvwKVVVVVVURTVVVVJmcaadnxDQ.TDxpxRQLyooppprrqxQ',
'....AFfeeeeeeejG...........QPyxrrxxrryBDNNNDDMMMMNDDCByyrrrqpoqqxxAJQ..........................FsheeeeeeeswwKVVVVVUQTVVVVVJmdaadnxDQ..PyqrRRDyoopppprqrQ',
'...JGwfeeeeeehjJ..........RQAnpppryBCMMLLDNNDCCByyrrrqqnnnqxxAJR...............................vkfeeeeeeeswwKVVVVUQTVVVVVVJmdaadnxDQ..PyqqJRNyoopppppnrR',
'...GIsfeffeeeimQ..........QJzpoppyBBCCCBByyxrrrqqoqnnxxAJQR....................................shkefeeeeeswwKVVVUQTVVVVVVVAmdaadnxDQ..PyqoJTPypoppoooou.',
'...AIseefeeeeguT..........QIznpopqnqrrrqnnnnqqnxuuzI...........................................seeeeeeeefsvwKVVURTVVVVVVVUAmcbadnxDQ..PBroATPCroppoooqI.',
'...AIkeefeeeegu...........JIzqpooqrxAuzzzzzzzGGGHH.............................................sheeeeeeeekvwKVVRRVVVVVVVVUAmcaadnxDQ..PCroxTPCropoopox..',
'...AFfefffeeedA...........JHtnrxJQTUTKHHFwvsssssvE............................................FskfeeeeeeehsvFUTQUVVVVVVVVUAmcaadnxCQ..PCrqxRQDxoooponI..',
'...AwfeffeefhjA...........JHtARUVVVVSFvskfhhhheeekw...........................................FvkhhheehhfhkvwRRTVVVVVVVVVUAmcaadnxCQ..PCrqrRQDyoooooA...',
'..GGvefeeehhijI...........JFHUVVVVVUFskhiggjjjjjgkwF..........................................FvlgdjjjjdgiisvHQUVVVVVVVVVUAjcaadnrDQ..PDxorQRNyqpoqrR...',
'..zIsefeeehfimQ..........RJFFSUVVVUHwtdjjtttggdjjtvE..........................................EvtjjdggdttjjttwIUVVVVVVVVVUAjcaadnrDQ..PMyqqJTPCrooqG....',
'..AHkefeehhfgm...........QIEvwFHKQGztjtllllkhhfhdmzw..........................................wztgihkkklllltjuzITVVVVVVVVUAjaaadnrDQ..PNynoATPDxoou.....',
'..AHfeeeehfegu...........QIwvwwvtttEkkwssllkkfehitBE..........................................EAtihfkkllskvwklEttITVVVVVVUAjaaadnrDQ..QNBqpATPNynqG.....',
'.IAEeffefheedu...........QKwvvsssksslwFvvwvvvssvvwBz..........................................zAwvsssvvvvvvHvlsskswKUVVVVUAjcaadmrCQ..QNCpqxRQNBrx......',
'.GGvehfffhehjA...........JKvvwlsvvvvvEGtuuummutwwwAGF.........................................AzwvwtmmmuuuuGEwvvwwssHSUVVUAjaaadmrCQ..QNCrorRQOCrA......',
'.AIsefffffehjJ...........JHswFvwFzuumnrnnrrrrqnAEwzJE........................................EBEwzAxrrrrqqnnmmuuzFvvFvFTVUAjaaadmrCQ..QNCronQRDDxJ......',
'.zIkefhhhheijJ...........GEwEEtuxnqrxxAJQ....QABAEzJE........................................wCEECPJR....QJAxxnnqxutFEwFSUxjaaadmrCQ..QNMxonJTPMyQ......',
'EtzdgdjjjjjjnA..........REFzurqrxAJQ............PBACw........................................ECACQT...........QJAuqnxuzFHTujbbadmrCJ..QMNyooATPNBPR.....',
'dmjjjnoooqqoqn...........unnnxAR.................QPD.........................................GPPQ.................QAxrqmG.xjbbbdmrCJ...DLyrqx.QNCDP.....'],
 f:['.............................................................................................................................qq.........................',
'..........................................................................................................................q..qqq........................',
'......................................................................................................................qpoop...qq........................',
'................................................................................................................r....rrqpop..rrq...qq...................',
'................................................................................................................sssrrrrrqp...rtsr..ppq..................',
'................................................................................................................svvvutsrqp..rsutr.poopq.................',
'................................................................................................................rrtvuttsrpppqsutrqpooop.................',
'..................................................................................................................qrssstsqpooquusqpooopq................',
'....................................................................................................................qsttssrpoptusqppooop................',
'...................................................................................................................qsttsssrqpprsrqqqqpppq...............',
'...................................................................................................................qsutsqqqzyyyxyyzrrqqqrrss............',
'....................................................................................................................rsrr.....zzyzzzqrrrstuvts...........',
'...................................................................................................................qsr......zzzz....qrsttssts...........',
'...................................................................................................................qrr......zzAAz....qrsrq.rr...........',
'............................................................................................................................ABDCBz....qrq...............',
'............................................................................................................................BDFECA.....qq...............',
'............................................................................................................................BDFFCA......................',
'...........................................................................................................................ABDEDBz......................',
'...........................................................................................................................AABCCAz......................',
'......................................................................qq...q................................................AACBzz......................',
'....................................................................rrttrrrsrr...............................................ACBz.......................',
'..................................................................rrsuvvtttuusrrr............................................BDCz.......................',
'................................................................rrstttuutttttttur............................................BDCA.......................',
'...............................................................qsutssstttttutstutr...........................................BDCA.......................',
'...............................................................rttsstuwxxwwwvutttsrq.........................................BDCA.......................',
'...............................................................rsrtvxyzAAAzzyxwusstq.........................................BDCA.......................',
'..............................................................qsssvyzzzAAAzyyyywtssq.........................................BDCA.......................',
'..............................................................qsstwyyxxyzzyxxxyxussq.........................................BDCA.......................',
'..............................................................qssuwxxxwxyyxwwxxxvsrrq........................................BDCA.......................',
'.............................................................qrrsvwxxxwxyyxwxxxwvtssq........................................BDCA.......................',
'.............................................................qrrtwxyyyxxwwwxyyyywussq........................................ADCA.......................',
'.............................................................qrqtxzAAzyvttvxzAAzyvssq........................................ADCA.......................',
'...rrr.......................................................prruxAAAzwtrrtwyAAAywtsq........................................ADDB.......................',
'...rts.......................................................qrsuxzzyxvtsstvxyzzywusq........................................AEECB......................',
'..stuts....................tt................................qrtuwxxxwvttsstvxxxxwusq........................................AEGFCB.....................',
'..tvvvt......t............uvu................................qsuvwxxxvtsssrrtvxxxwusq........................................AEGFECB....................',
'..uwxwwv....vwv...........vxv...............wwwwv............qsuwxxxwuttuutssvwwwwusq.............qrrr.......................AEFEEECA...................',
'..wyzzyx...xxzyx.........xyzx................zCCzyy.xxwvutssrstvxyyxvuuvwxwvtvwwwwusrrrrrrrrrrrrrrsvvr.......................BEGFEEDA...................',
'..yzABAAz...zAz.........zABBz...............ACFHEECABCBAzyxwwvuvxyxwvvwxyyxwvvwwwvtstvvvvvvvvvvvvuvyvr.......................BFHHGFDBA..................',
'..zABCDDB....B.........BCDDDB...............CGJJHIHFGGGEDCAzzxvwxxwwvwxxxxxwwwwxxwtsuyyyyyyyyyyyxvxyvr......................ACFGGHGFDA..................',
'...BDEFFED..DD..D......DEFFFD...............EILJGFFFEECBzxwwxwvwxxxwwxyxwwwwwwxyyxustxxutttttttsssvyvr......................AEGGFFFGECA.................',
'...CEGHHGFEEE..EGFE...EFGGGFE...............FJMJECCCBAzxvuuvxwuvxxxxxyyxvvvwwwxyyxustwvspppppppppqtyvr......................AEHHFEFGGEA.................',
'...DGHJJIHGGF..FIIF..FGHHHGF................GKNJFEDDCBAywvwyzxuuwxxxxxxvutvvvwwwxvtrtxyvrqqqqqqqqqtywtq.....................BFHHHGHHHDA.................',
'...DHJKKJIIHF..GJJGFFHIJJIHG...............GJLNJGGGFFECAyxyAzxutuvwwvvvtsstttuuuutrruyAzvsrstuuttstxyvq.....................BDFGGHIIHDA.................',
'...DGIKKLKJHF..GJJHHIIJKKKIG...............GLNOJHHHHGFDBzyxyyxvtstuuuttsrrsssssssrrsuxAAwtstuvvvuttxyvr......................BDEFGIIGDBz................',
'....FHJKLLKIGGGIJJIJKKKKKJIG...............GJMOJHHHHGFDBzxxxyyvsrrsssssrrrrrrrsssrrtvwyzvtstuvvvuttxyvr.....................BCFGGHIHFDCz................',
'.....FIKLLKIHHIKLLLLLLKKJHG.................HLNIGHHHGFDBzyyzAyvsrqrrsrrrrrrrrssssrsuvwxxutttuvvvuttxyvr.....................AEGHHHHFDDDA................',
'....EGJKLMLJHHIKLLLLLLKJHG.................HJMMHGGHHGFDBzzABByvtsqrstsrssrrrttuutrsvwwwutttttvvvutswyvr.....................ADGGFFEDCDDA................',
'.....FIKLLLKIIIKLLKKKKJJG..................HLNLGFGGGFEDBzyABzwvutrtvvvuvvuuvwwxwursuwxvtsttttuvuutsvyvr.....................zDHGEEDBBCDA................',
'.....FHJKKKJJIILMLJIIIIHG..................HLOKGFGGFFECAyxyywuuutsvyyyyyyyyzzzzyvtuvxyxvuttttuttttstwwsq....................zDHGEDCBBCDA................',
'......FHIIIJJJKMNMJHGGHG...................HLNJFFFFFEDBzxwvvutssssvyzAAAAAAAAAzxvvvwxzzxvttstussuuttvwuq....................zDHGEDDBBCDA................',
'.......FGGHJJKLMMLJHGGHGG.................GIMNIFFGGGGECAyxwwvusrqruxzzAAAAAzzzxutuwwxyzxvutsttstvwwvvwuq....................zDHGDDDCBBCA................',
'..........GIJKLLKJIIHGHGG.................GKNMIFHJKKKIGDBAAyxvtrqqsvwwxyzzyxxxwtrtvvwxyxwutssstuwyzzyxuq....................zDHGDDEDCCCBz...............',
'.........GHIIKLLJJIHGGGG..................GKONKJLNOONMKIGEBywutsttuvvvuuwwuuvwvtrsuuvxyzyvtrrsuvxAAAzyvr....................zDHFDDEEDCDDz...............',
'........FHIJJLNNLKJHGGG...................GKNNNNOPPONMLJHFBwtsttvxyxxwuttssuwwwtrsuuwxyzxutrrsuwyAAAzyvr....................ADHFDEFFEDDCz...............',
'.........GHJKMOOMLJGGG....................GKNOOOPPONMLKJHEBwsrstvxzzzyxuttuwxxxustuvvwxwutssstuwzAAAzywtr...................ADGFEFGGEDDCz...............',
'.........FGIJMOOMMKHG....................GHKNOOOOONMKKJIGECyussstwyzzyywvuwyyxxvssuvvvutssstuuuvzAAAzyxvr...................ADGFEFHGFDCAy...............',
'..........GHILNNMMKIG....................GJMNNOOONMKJJJHFEBzwtsstwyyyyyxwwxyyyywsqsuuttsrrsvvuuvyAAzyxxvtr..................ADGFEFHHFDBz................',
'.........GHHHJMMMLKIG....................HKMNNOONMKJIIIHFDzwtrrsvxyyyyyxwwxyyyyyuqqstttusrtvwvtuwxxwwwwvusrq................ADGFDFHGECAz................',
'........GHIGGJLMLKIHG...................GILNNNNNNLKIIJIHFCytrqqsvxyyyyxxvwxyyyyyvrqrttuwusuwvusstuvvvwwwwvusrrr.............BDGFDEGECAz.................',
'........GHGFGJLLLKHGF...................HKMNNNONMKJIJJIGECytrqqrvxyyyxxwvvxyyyyywrqqssuvvuvvutsrtvwxyyyyxxwvuutss.........ABCEGEDDEDBz..................',
'.......GHHFFHKLLLKHFF..................GILNNNONNLKJJKKIGECzwtrrsvxxxxxxwvvxyyyyyxtqqrrstuuvuttrsvxzAAAzyyxxxxxwvut.......ABDEFGECCDCA...................',
'.......GIIHHJLLKKKHFFF.................GKMNNNNNLKJKLLKIGECAywvuvwxxxxxxwuvxyyyyyxurqrsstuutstsqruxzAAAzzyyyxxxxyxvu.....ABEFFGGEBBCBz...................',
'......FGHIIJLMLKKJHEFGG................HKMNNNMLKJJLMMLJGECAzyxwxxxxxxxxvuuwyyyxxyxvtuvuutssttrpqruwyyzzzzyyyyyyyyxwv...zBEFGFGGEBBCz....................',
'......FHHHIKMMKKJIHFFGG...............GIKMMMLKJHGIKMMLJHECAzyyxxxxxxxxwuttvxyyyxxyyyyxvtttuutqppqstvwxyyyyyyyyyzzzxwwxyBDFGGGGGEBBC.....................',
'.....EGIIHJLMLLKKIGFFGF...............GJLLLKKIGEEFJMMLJHECAzyyxxxxxwwvutssuwxyyyxxyzzxutuvvuspppqrrstvwwxxxyyyyyzzyxxzBDFGGGGGGEBCC.....................',
'....DFFGIIKMMLLLLJGEFGF...............FIKKKJIHEEEEHLMLJHFCAzyxxwwwvvuttrqrsuwxxyxxxxxwuvwwvurpppqrsrrsuvwwwwwxxxxxxxzBDFFGGGGGGECC......................',
'.....D.FHJLLLLLLLJFDDEFF..............FHJJKKJGEEEEFJKKJGECAyxwvvuuttssrqpprsuvvwwwwwwvvvvutsqpooprttsrsuvvvvvvvvvvwyACEFGGHGGGGFCC......................',
'.......FHJLLLLKKJGE..DD...............EHJLMMKIFEEEDGIIHFCAywvuttssrrrqppoopqrstuuuuuuvvutsrqqqpoprtuutttuttttssssuxzACFGGHHGGGHFDC......................',
'......EFHJKKKKJJIF....................FILMNNLIFFEEDDFGFDBzwvttsrrrqqqqqppppqrrsssssttttsrppqsrpooqsuvuuttsrrqqqqsuxzBCEFGGGGFHHGDC......................',
'..BDEEFGHJJJKJIIHE...................FHKMNONLIGGFEDDCDCBzwutsrrrrrsssssrqqrsstttsssrrrqqpopsusqoooqtvvuutssrrrrstvyABCDEFFFEFHIHDC......................',
'...D..EGHJJIJJIHHF..................FHKMNNNMKIHHGEDDCBzxvtsrrsstuuvvvvvusstvvvvvvuutsrqqppqtusqooopsuuuuutttssttuvxzBCDEEEEEFHIHEC......................',
'...DEEGHHJJIJJIHHGFF...............EHKMNNONMKIIIGEDDCBzxvtrstuvwwwwwwvvtsstuvwwwwwwwvutrqqrtusqpooprstuuuuuuttuuvwxyABCDDDDDFIJIED......................',
'......FHIKKIIJIHIIJHG..............GJMNNOONLJIIIGEDEFDzxvtuvwxxwvvuutttsrrrsttuuvwwxxwvtsstuutsqooprrrsuuuuuuuuvvwxyzABCCCCDFIJIFD......................',
'......FHJKKIIJIHHIKKHG............FHKMNOOONLJIIIGEDGHHEzwwxxxxwuttsstttsrrstttssttvwxxwvuuvvwvtqooqssqrtuttuuuuvvwxzAABBBBBDFJJJFD......................',
'......FIKKKJIJIGFGIKKHF...........FJMNNOOOMKJIIIFEDGJKIEAyxxwvutsttuvvvuttuvvvuttttuvvvvvwxyywtqooqssrsttsstuuuuvvxyABBBBBBEGJJJFE......................',
'......FJIIIIIIGF.FGIKJF..........EHKMNOOONLKJIJHEEDFILJHEBzwvtttuvvwwwwvutvwwwwwvutttuvwxyzzzwsqooqttssttrrstutttuvxzBBBBBBEHKKKGE......................',
'......FHGFFFFFE...FGJJF..........FJMNNOOOMLJJJIGEEDEHJJHFDAxuttuvwwwwwwvutvwwwwwwwutttvxyzzzyvsqooqttstutsrstutsttuwzAAAAABEHKKKGE......................',
'.......F...........FIJHF.........FJMNOOONLKIIJIFEEEGHIIHFDAxustvwwwwwwwvttuvwwwwwwvtstvxyyzyxvtroorttttutssstuttttuwyAAzyyAEIKKKHF......................',
'...................FGJIF.........FJMNNNNMKJIIJIFEEFIJJIGECzwtstvwwwvvvutsrstuuvvwwvtssuwxxyyyxuqoortttuutssttuuuutuwyAAzyyAEIKKKHF......................',
'....................FGJHE........EILMMMLKJIIJJHEEEEILLJHEByvsstvvvuutssrqqqrsstuuvutrrtvwxyyyxuqoprttuuuusstuvvuuuuwyABAzyAFILLLHF......................',
'.....................FIJHFEEEFFEEGIJKKKJIHIJJJHEEEFHKKJHEByvsrsuutssrrqpoopqrrrstttsrrtvwxxxxvtrpqrttuvvusstuvvvvuuwyABAzzAFJLLLHF......................',
'.....................EGJKJJJJJJJJJKJIHGGGHIJJIGEEEGHJJHFCAxusrssssrrssrqppqrssrrssssrrsuvwwwvusrqqrstvwwvsstuvwvvuuwyABBAzAFJLLLIG......................',
'......................FGJMMMMMMMMMMKHEEEGIJJJHFEEEHJJIGEByvsrrsstttuuuusrrsuuuuttsssrqqrtuvvvuusqqrstvxxussuuvwwvuuvxzBBAzAFJLLLIG......................',
'.......................FIKLMNNNNNNNMJFEEHJJJHGFEEEILLJHFCyurrrstuvvvwwvuttvwwwvvvutsrqqrtvwwwwvtqpqstvxxursuuvwwvuuvxzBBAzAFJLLLIG......................',
'.......................EFHIJLLMMMMNNMJFFIJJHFEEEEEIMMLIGDzvsrstuvwwwwwwvuuvwwwwwwvutrqqsuwxxxywsppqrtvxwtrsuuvxwvuuvwyABBAAGJMMMIG......................',
'........................EEFHJKKLLLMNNMJIJJIGEEEEEEHLMLJHEBxtsstvwwwwwwwvuvvwwwwwwwvtsrrtwxyyyywrooprsvxwsrsuuvxwvuuvwyzAAAzGJMMMJH......................',
'..........................EGIJKKLLLMNNLKJJIFEEEEEEGJMLJHEByussuvwwwwwwvvuuvvwwwwwwvtsrsuwxyyyyvqoopqsuwvsrtvuvxxvuuvwxzAAAzGJMMMJH......................',
'..........................EGHJKLLLLLMMLKJJIFEEEEEEEIKKJHEByusstvvvvvvuutsstuvvvvvvutsrsuwxyyywupoooqruwvrrtvuvwxvuuuvxyABAAGKMMMJH......................',
'....................EEEEEEEFGIJKLLLLLKJJJKIFEEEEEEDGJKJGEByurrstuuuttssrqqrssttuuutsrqsuwxxxxwtqooopqtvurqtuuuwwvuuuvwzCDDDIKNNNJH......................',
'...................EFGGGGGGFEGIJKKKKKJJJKLIEEEEEEEDGIJIGEByurqrssssssrqpoopqrssstssrqpruwxxxwvuqooopprutqqsuttvwvutuvwzEFFFKLNNNJI......................',
'...................DGIJJJIHDCEGIJJJJIIIJLMIEEEEEEEEGIIIGEByurqrstttttsrqooqrstttttsrppruwxxxwvuroooooqssqqsuttvwvutuvwyEHHHLMNNNJI......................',
'...................CFJKKKKGCCCFHIIIIIIJLNMHEEEEEEEEHIIIGEByurqstuvvvvvutrqsuuvvvvvusqqsvwxxxwvusooooooqrqqsuutvwvutuvwxDIIINMNNNJI......................',
'..................zBEIIJJKGBBCDFHIIIIIKNOMGEEEEEEEGIIIIGDByvrrsuvwwwwwvuttuvvwwwwwvtrqsvwxxxwvutpooppprtttvwwwxxxwuuvwxBHIINNOONKI......................',
'..................xAEGHHIIEABCCDGHHHIJMOOLFEEEFFFGIJJJIGDByvsrtuvwwwwwvvuuvvvwwwwvvtrrtvwxxxwvuuropsttvwwxxyyyzzzzxuvwxzFIINNOONKI......................',
'..................vyDEFGGGBzABCDDEFGILOOOMHGHJKKKKLLKJIGDByvtssuuvvvvvuuttuuvvvvvvutrsuwxxxxwvvvuttvvvwwxxxxxxyzABBzxwxzEIINNOONKJ......................',
'..................uxBCDEFDyyzACCDDEFIMOOONLKMNNNMMLKJIHFDBzwusstttuutttssssttuuuuutsssuwxxxxxwwvvvvvvvvvwvvvuuvwxzBCCAzAEHINNOONKJ......................',
'..................svzBBCDAwxyABCDDEHKNNNMMLMMNNMLLKIHGFDCAzxvutuuuuuuttssssttuuuuuutstuwxxwwwvvuuuuvvvvwvvvuttttuvxACDDDFIIONOOOKJ......................',
'.................qrvyzABByuwyzBCDEHKLMLKKKKKKKKKKJIHGEDBAyxxwvvvvvvvvvvuttuvvvwwwwvvuuvwwwvuuuttttuuvvwwwwwwvvvvvuvwyACEGHIONPPOLJ......................',
'.................prvyyzAAwtvxzABEIKLLKKJJJKKKKKKJJIHGECAywwvvvvwwwwwwwwvvvwwwwxxxxxwwwwwvvuutttsssttuuvwwwwwwxxyyxxwwwyADFGNNPPOLK......................',
'.................oqvxyyzyusuwyADHKLLKKKKKKKKLLLLKKJIGFCAywuuuuuvvwwwwwxwwwxxxxxxxxxwwvvvvuutsssrssttuuuvvvvvwwxyyyyyywwwzBDMNPPOLK......................',
'.................nquwwxywsrtvxBGKLLLKKKKJJJJJJJKKKKJIGEBzwvuttttuuvvwwwwwxxxxwwwwvuuttuuvutsrrrstuutttuvvvvvvvwwxxxyyyxwwxAKNPPPLK......................',
'................lmptuvwwtpqsvAEIJJJIIIIIIHHGGGGHHHIIIHFDBywvutsssssssttuuuuuuttssrrrstuvusrqrstuutssstvvwwvvvwwwwwwwwwxxwwwJNQQPMKK.....................',
'................jmpsttuurnotzDFGGGFFFEEEFFFFFEEEEEFFFFFDCAyxwuutsrqppppooppooooooprtuvutqpprsuuutrrsuvwwwwwwwwxxxxxwvuvwwvvINQQPNLK.....................',
'................hkoqrssrokmtyBCCDDDDCCBBBBCCDDCCCCCCCCCCBAzyxwvvutsrqpoooooooooprtvwwurpoqstuuusqqsuwxxxwwwwxxxyyzzyxvutuuuINQQQNLKu....................',
'................fimoppqolilrvxyACCCCCBAAzzzzzzAAAAAAAzzAAzzyxwvvvvvvuutsrrrrrstuwxxwuqooqtuvvusporvxyyxxwwwwwwxyyzzzyxvtsstJNQQQNLKts...................',
'................eglmnnnmigjosuxzBBBBBBAAzyxwvvvwwxyyyyxxxxyxwvuuuvvvwwwwwwwwwwxxyxwtqooruvwwvspopuxyyxwvvuuuvvwxyyyzzywusrrJORRQNLKtsr..................',
'................efjllmmjffhmqtwyzAAAzzzzzzywusrrrsuvwwwwwwwwvvuuuuuvvwwxxyyyyyxxwvspooruwxwvtqoosxzzywvttsssttuvwwwxxxwvtrqJORRROLJssq..................',
'...............edfijkkkideflpsvxyyyyyyyyyzyxwusqqqqqstuvvvvvvvuuuuvvvwwxxxyxxwvutsqpqsvxxxvtqooqvyzywvtssssssstuuuuuvvvvusqJORRROLJqrqp.................',
'...............ecgijjkjgbdekosvxxxxxxxwwwxyyxvutrqppppqrtuuvvvvvvvvvwwwwwwvuttssssstuwxxwvsqpopsxzzxvtssssssssstttttuuuvvtrKORRROLJqqrp.................',
'...............ecgijjjifbcejosvwxxxxxwvuuvwxxwvuutsqppoooqrtuvvvvwwwwwwwvuuttttuvvwxxxxvtrqpqpquzzywusrrsssssttttttttttuuusLPSSROLJqqqqp................',
'...............ecgiijjiebcejosvwxxxxwvtsttuvwwvvvvuutrpoooopqstuvwwwwwwwwvvvvwwwxxxwwvtrqppqrprwzzxvsqqstttttuuttttttsstuutMPSSRPLJpqqrqpo..............',
'..............eddhiijjhdacdjosvwxxxxwutssttuvvvvvvvwvvtrpoooooprstuvvvwwwwwwwwwvvuutsqpooprrqprxzywurpqstttttuvutttutsrsuutNQSSSPMJpqqrssqp.............',
'..............ecfhiijjhcacdjosuvwxxxwutttttuuvvvuuuvwwwvtrqoooooopqrsssttttttssrrqqppoopqrsrposyzyvtqoqtuuttuvwvuttutrqrttsNQSSSPMJopqqrstqo............',
'..............ecfiijjjgbacdiorttuwxxwutttuuuuvvvuttuvwwxwvtrqppooooooopppppppppppppppopqstsqopuzzxuspoqtuuutuvwwutuutrpqsssNQSSSPMKooppoprtqo...........',
'..............ecgiijjigaacdinqsstuwwwuuuuuuuvvvwvutttuvwwwvttssrrqqpppppppppqqqrrrqqpqrtttqooqwzywtrooruuuttuvxwuuuuusppqrrNRTTTQNKoopo..qttp...........',
'.............edcgiiijifaaceimpqrstuvvuuuuuutuvvwwvtsstuuvvvuttttttssssssssssttttssqqqstutroootyzxvtqoosuuutttwxxvuuuuspopqrNRTTTQNLooppo.pruqo..........',
'.............ecdfgghhgebbdgilnppqstuuvvvvutsttuvvvutsstttuuuttuuuuuuuuuuuuvvvuutsrqrsuutrpooqwzzxusqopsvvutstwxxvuuuutqooprORTTTQNLpopqo..prto..........',
'.............eccdeeeeeeeegijlmopprstuuuuutsrrsttuuuttttttttttuuuuuuuuvvvvvvvutsrqqrtuutrpoopuyzywurpoptvvutstwxxvuuuutqooprOSTTTRNLppoqpo..pqqn.........',
'.............eccdeeeeeefgikklmnppqrrstttssrrrssssttttttttttttuuuuuuuvvvvvuutsrqqrstuutrpooptyzzxvtrpoquvvutrtwyxvuuuuurooprOSUUUROLqppqqo...oo..........',
'.............ecfghhhgffghijklmopqqrrrssssssssssssstttttttttttuuuuuuuuuuttsrqqqqrtuvusqoooptyzzywusqooruwvusrswyxvuuuuusoooqPSUUUROMqqpprpo..............',
'.............echiiiigfffghijkmopqqrrrrssssssssstttttttttttttuuuuuuuutsrrqqqqqrsuvvusqoooptyzzzxvtsqoosvwvusqswyxwuuuuuspooqPTUUUROMqrqqrro..............',
'............eddhiiihffffffhjlnopqrrrrssssssstttttttttttttttuuuuuuuutsrrqrrrsstuvvtrpoooquyzzzxwusrpoptwwvurqswyywuuuuutqooqPTUUUROMqrrqrro..............',
'............ecfhiihgfeeddfilnoppqrrrrssssstttttttttttttttuuuuuuuuutsssssssttuvvutrpooorvzzzzywutsrpoquwwvurqswyywuuuuutqooqPTVVUSPMqrrqqrp..n...........',
'............ecgiijhfeecccfimoqqqqqrrrrssssttttttttuuuuuuuuuuuuuuuutssrssssttuutsqoooorvzzzzzxvtssqoorvwwvurpswyywuuuuuuroopPUVVVSPMqssqqrqo.nn..........',
'............echiiihfedcbcfjmpqssrrrrrrssssttttttuuuuuuuuuuuuuuuuuuuttssrsssttsqpooopswzzzzzxvussrqoosvwwvtqpswyywuuuuuuroooPUVVVSPMqstrrsrp..nn.........',
'............ecghhhgfedcbcfjmoqstssrrrrrssstttttttuuuuuuuuuuuuuuuuuuuutttsssrqpooopruxzzzzzxwutssrpoptwwwvtqpswyywuuuuuuspooPUVVVSPNqstsrtsqo.nom........',
'...........edccdeeeeeecbdfjmorstttsrrrrrsssttttsstuuuuuuuuuuuuuuuuuutttssrqpooooqtwzzzzzzywutsssqooquwwwvsppswyywuuuuuuspooPUVVVTPNqsutsturo..nm........',
'...........eeedcbbbcdedcdgjmprstuvvusrrrsssttttsrsuuuvvvvuuuuuuuuuuutttssrpoooqtwyzzzzzzywutssssqooswxxwvsposxzywuuuuuutqooPUWWWTQNqsvtsuuso..nnl.......',
'..............eccbaacedcdgjmpsttuvwwvtsrrsssssssrrstuuvvvvvuuuuuuuuuuuttsrqpqsvyzzyxyzzywvtttttrpppuxxxwvsppsxzywuuuuuutrppPUWWWTQNqsvustvtqo.mnmj......',
'..............eegebaceeddgjmptuuuuwxywvtssssrrrrqpqrstuuuvvuuuuuuuuuuuuutsstvyzzzxwxzzyxvutttttrpprvxxxwuspptxzzxvuuuvvurppPUWWWTQNqtvursvuro..mnli.....',
'.............edgigdbcffeegjmqtvwvvvwyzywutsssrqqppppqrsstttttttttuuuuuuuuuwyAAAyvvxzzzxvutttutsqpptxyyxwusppuyAzxvuuvvvusqqQVWWWTQNqtwvssvvsqn.mnmi.....',
'.............efijhdbdfgfegjmqtwxxwvvxzzzywuttsrqqqqqqqqqqrrrrrrsstuuuuvvxyAAAzwtuwzAzxwuutuuutrqqrvyyyxwusqquzAzxvvvvvvusqrRVXXWUQOqtwwsruwuro.mmmjg....',
'.............egjjhdcceggggilptwyyxvvvxzAAzxwuttsqqqqqqqqqqqqqrrstuuvvwxyAAAAxustwzAzywvuuuuvvtrqqtxyzyywusqqvzAAywvvvwwvtrsRVXXWUROrtxwtruxwsp..lmlh....',
'.............egjjhdcceghhhilotwyzywvvwxzABAzywvutsrrqqqqqrrssttuvvwwyzABBAyvsrtwABAzxwvuuvvvvtqqrvyzzzywusqrwABAywwwwwwwussSVXXXUROruxxtrtxwtq..lllh....',
'.............ehkjgccdefhiiikoswyzzyxwwwxzABBBAzyxwvuuuuuuuuuvvwxxyzABBBAyvsrrtxBBBzywvvvvwwwusrruyzzzzywusrsxBBBzxwwwxxwuttSWXXXUROsuyyurtwxurp..klh....',
'............efikkgccegghijklnrvyzAzzyxwwxyABCCCCBBAzyyyyxxyyyzzABBBBAzxvsrrrtxBCBAyxwvvwwwwwtrrswzAAAzywusrtyCCCzxxxxxxxvtuSWYYXVSPsuyzvsswyxtq..kkjg...',
'............ehklkgcehiihiklmorvyAAAAzywwwxyzABCCCCCCCCCCCCCCCCCBBAzxvtssssstyCCCBzxwwwwwxxwvsssvzAAAAzywutsvACCCAyyyyyyywuuSWYYYVSPsvyzwsswzyuq...ji....',
'............eilmkgdfijjjjkmoprvyABBBAyxwwxxyyzABBCCDDDDDDDDDDCAzxwutssssssvzCDDBAyxwwxxxxxwussuyABBBAAzxvutwBDDDBzzzzzzzxvvSWYYYVSPtvzAxtsvzzwsp..ji....',
'............fjmmkfdfiklkklnpqsuxABBBAyxxxxxyyyzzAAABBBCCCCCCBBzyxwvvvvvvwyBDDDCAzxxxxxyyyxwttuxABBBBBAzxvvvyDDDDCAAAAAAzywvSWYYYWTQtvzByutvyAyuq........',
'............fjmnkfefillmmnoqrtvxABCCBzxxxxyyyyzzzzzAAAAAAAAAAAAzzyyyyxxyADEEDCBzyxxxyyyyyxvttwABCBBBBBzxwwwAEEEEDBBBBBBAzxwSWYYYWTQuwABzvuvyBzvr........',
'............gknnkfefjlmnopqrstvyACCCBzyyyyyyzzzzzzAAAAAAzyyyyzzzzzyyyyzBEEEECBAyyyyyyzzzywuuwzBCCCBBBBzyxxyBEEEEDBBBCCCBAyxSWZZZWTQuwACzwvvxBAxsp.......',
'...........gilnnjfffjlmnprttuvwyBCDDCAyyyzzzzzzAAAAAAABAAzyxxxxyyyxxyACFFFEDBAzyyyzzzzzzxvvvzBCDCCCCCBzyyyyBDEEDBAAABCCCBzxSWZZZXURvwACAxwwxACzvq.......',
'...........hlnoojfffjmmmosuwxxyzBDEDCAzzzzzzAAAAAAABBBBBBBAyyxxxxyyzBDFFFEDCAzzzzzzAAAAywvvyBCDDDDCCCBzyyyxxyABBzwwxyzABAzySWZZZXURvwADByxxxACAwso......',
'...........hlopojgggjmmlnquxzABBDEEEDBAzzAAAAAABBBBBBCCCCCCBzyyyyzACEGGFEDCBAzzAAAAAAAzxwwyBDDEFEDDDCBAzzywwwyBAywwwwwxxyxxSVZZZXURvwADByyyyzCCyup......',
'...........impqojgggjmmlloswzBDEEFFFEDBBBBBBBBBCCCCCCCDDDDDCAzyzzBDFGGFEDCBAAAAABBBBBAywwxADDEFGFEDDDBAAAzxwwzBBywwwwwwwwwwQUZZZYURuvADByyzyzCDAvq......',
'...........jmpqnihhhkmmllnqtxBDFGGHGGFEDDDDDDDDDDDDDDDDDDDCCBzzBDFGHGFEDCBAAABBBBBBBBzxxxADEEFGHFEEDDBAABAyxxACBzxyzzzyxxxxPSYZZYVSvwzCCzzAzzCDBwro.....',
'...........jnqqnihhhkmmlmnprvyBDFGHHHHHGGGGGGGGGGGFEEDDDCCBAAACEGHHGGFEDBBBBBBBCCCCBAyxxzCEEFGHHFEEEDBBBBBzyyBDCAACCDCCBzyxPSYZZYUTwwyBCzzBBzBDCytp.....',
'..........jloqqmiiiikmmmmnprtwyACEFGHHIIIIIIIIIIIHGEDDCBBAzzBDGHIHGGFEDCBBBBCCCCCCCBzyyzCEEFGIIHFEEECBBCCCBAADECBCEEEEDDCAASVZZZXUT..yBDAABCAADDAup.....',
'..........joqrqnjiijlnnmnoqrtvxzABCDEFGGHIIIJJIIHFEDCBAzzzzCEHIIHGGFEDCCCCCCCCCDCCBzyyACEFFGIJIGFFEECCCCDDDCCEECBDEEDDCCBBCVZZZZXUT..yCEBACCBACDBwrn....',
'.......jjkloqqqonmmmoponnpqsuwyzAABBBCDDEFFFGFFEDCBAzzzzzBDGIJIHGGFEDCCCCCDDDDDDDCAzzADFFGHIJJIGFFFDCCCDDEEEEFECCDECBBAAAADXZZZZXUT..zCECBCDCACDCyto....',
'.......knnnoppppppppqqpooprtvxzABBBBBCCCCCDDDCCBBAzzzzzADGIJJIHHGFEDDDDDDDDDDDDDCBzzBEFGGHIKKJHGFFFDCCDDEEFFGGECCDCBBBAAACEYZZZZXUT..zDFDBCEDBBDDzup....',
'......kmprrrrrrrrqrstsqppqsuwyABBCCCCCCCCBBBBAAAAAAAAADGJKKJIHHGFEDDDDDEEEEEEEDDBBBDFGHHIJKKKIHGGGEDDDDEEFFGGGECCCCCEECBCEGYZZZZXUT..zDGECDEECBCDAvqn...',
'......lpstutttttsrsuvusqpqsuxzABCDDDDDCBBAAAAAAAAAAADGJLLLKIIHGFEEEEEEEEEEEEEEDCCCEGHHIJKKKKJHGGGFEDDDEEEFFGHGECCDDFGGEDDEGYZZZZXUT..ADGECDFFDBCDBxso...',
'......lptuvvuuuusrtvvwusrrtvxzBCDDEEEDDCBBBBBBBBBBEHKLLLLKJIHGFEEEEFFFFFFFFFFEDDEGHIIJKLLLLKIHGGGFDCDDEEFFGHHHECDDEHIHFEDDFXZZZZXUT..AEHFDDFFECBDCztp...',
'......mquvvvvvvussuwwwvtsstvxABDDEEEEEEDCBBBBBBDGILMMMMLKIHGGFFFFFFFFFFFFFFFFFFGHIJJKLLLLLKJHGHHGEDCDDEEFGGHIHEDDEGIJIFDCCFXZZZZXUT..BEIGDEFFFDBCCAvqo..',
'......nruvwwwvvussuwwwwvttuvyACDEEEFFEEEDCCCCEHKMMMMMMLJIHGFFFFFFGGGGGGGGGGGGGHIJKKLLLLLLLJIHGGGFDCCCDEFFGHIIHEDDEGJKJGDCCFXZZZZXUTA.BEIHEEFGFECBCBxso..',
'.....npsvwwwwvvtrsvwwwwwvuvwyACDEFFFFFFEEEFHJLNNNNNNMKJIHGGFFGGGGGGHHHHGGGGHIJKKKLMLLLLLLKIGFFFFEDCDDEFGHIJJJGEDDEGJKJGDCCFXZZZZXUTB.BFJIFEGGGFDBBBzuqo.',
'.....nruwwwwvvusrsvvvwwwwwwxzBDFGGGGHHHHIJLNNNNNNNNLKJIHGGGGGGHHHHHHHHHHHHIJKLLLMMMLLLLJHHGEDDDCCCCDEGIJKLLLKHEDEEGIKKHEDDGYZZZZXUTB.CFJJGFGHGGECBBzwso.',
'.....ortuuutttsqpqrsstttuvwzCFHJKKKLLLMMNOOOOOOONMLJIHHGGHHHHHHIIIIIIIIIIJKLLLLMMMLJJJIGEEDD.......EGJLMNNNNLHEEEFGHJKHEDDHYZZZZXVTC.CFJKHFGHHIHECBAxtp.',
'.....oqrsssrrrqponooooppqsvzEIKMNOOOOOOOOOOOOONMLKJIHHHHHHIIIIIIIIIIIIJKKLMMMMLKJJJHFEEE.........EFGJMNNOOONLHEEFFGGIJIFEEIYZZZZXVTC.DGKLIGGHJJJGECAytq.',
'....oprtuuuuttrp..........uzEILMNOOPPPPPOONNMMLKJIHHHHIIIIIIJJJJJJJJJKLMMMMKKJJHGFFE............EGJKMNOOOPPOLHFFFGGHHIHFEEIYZZZZXVTD.DGKLJGGIJKJIFCBzvrp',
'....pruxyyyxxwtp..........txBFIKMNNNNNNNNMLLKJJIIHHHIIIJJJJJJJJKKKLLMMMLKKKIGGGF................FJMNOOOPPPPNLHFFGGHHHIHGFFJYZZZZXVTD.EGKMKHHIKLKIGDBAxur',
'....pswzzzzzzyuq...........wAEGIJKLMMMMMLKKJIIIHHIIIIIJJKKKKKLLLMMNNLLLJHHGG....................GKOOPPPPQPONKGFGGHIIJJIGFGKYZZZZXVTE.EHKMKHHJKLKJHECAzwt',
'....qtxzAAAAzyvq...........wAEGIJKKLMMLKKJIIIHHIIIIIJJKKLLMMMNNMLLLLJHHH........................HLOPPPPQQPONKGGGHIJKKJIGGHLYZZZZXVTE.EGKMLIHJLLLJHFDBAxu',
'....ruyAABAAAzvr...........xBGIKLLLLLKKJIIIIIIIIIJJKKLMMNNMMMMLJIIHHH..........................HJMPPPPQQQPONKGGHIJKLKJIHGHLZZZZZXVTF..GJNMJHJLMLJHFDBzwt',
'...rsvzABBBBAzvr..........wzDILMNMMLKKJJJJJJJKKKKLLLLLLMMMKIIIIH...............................IMPQQQQQQQPONKHHHJKLLKJIHHIMZZZZZXVTF..HKNNKIJLMMKIGECzvs',
'...ruxABBBBBAzvr..........wBGKMNONNMLLLLLLLLLMMMMLLKIIIIIII....................................JNQQQQQQRRQPOKHHIKLLLKJIIHIMZZZZZXVTG..HKOOLJJLNMKIGECyu.',
'...suyBCCCCBByur..........xCILNOPOONNNNNNNNNNNMMLKII...........................................KNQRRRRRRRRQOLIIJLLLKKJJIIJNZZZZZXVTG..HKOPMJKLNMLJGEBxu.',
'...svzCCCCCCByt...........yDIMNOOONMMNNNNNOOOONMLJ.............................................KORRRRRRRSRRPMJIKLLKKKKJIIJNZZZZZXVTH..ILOPNKKMNNLJHEAv..',
'...twACCCCCCByt...........yDJLMLKKJJKMNOPPQQQQQPNK............................................JMPRSSRRSSSSSQNKJKKKKKKKJJJKOZZZZZXVTH..ILPQOLKMNNMJHDzv..',
'...txBCDDDDCCyt...........yEIJIHIIJJKOQRSSSSSSSRPMK...........................................KORSSRRRRSSTSRPMLKJJKKKKJJJKOZZZZZXVTI..ILPQPMKMNNMKHDx...',
'..tvyCDDDDDCByt...........zEHGFHIJJJNRTTTTSSSSSSRPMK..........................................KORSRRRRRRSSTSRPMKJJJKKKJJJKPZZZZZXVTI..JLPRQNLLNNMJGBx...',
'..uwACDDDDDCAwt..........xAFIHGHIJJMQSTTSSSSTTTTSROK..........................................KORSSSSRRRRSSTSROLKJJJKJJJJKPZZZZZXVTI..JLPRRNLLMNMIDz....',
'..uwBDDDDDDCzv...........xBHKLLLLMNPSTSSSSSTTTUTTROL..........................................KORSTTTSSRRSSSTTRPNLKKKKKKKKOYZZZZXVTI..JLORROLLMMLIC.....',
'..uxBDDDDDDCzv...........xCHLOPQQRRRSSRRSSSSTTTTTRNL..........................................LNQTTTTSRRRRRSTTTSSQNLKKKKJJOYZZZZXVTI..JLORRPMLLMKGB.....',
'.uvyCDDDDDDCzu...........xCIMOQRSTSSSRQQQQQQQRSSSQNL..........................................LNQSSSRQQPQQQQRTTTUTROMKJJJJNYZZZZXVTJ..JLOQRPMKLLJE......',
'.uwzCDDDDDDCyu...........xCIMOQQRRRRQPOOONNNNOPQQQOMK.........................................LNQQQPONNNNOOPQRSTTTTSPNKJJJNXZZZZXVTI..JLNQRPLJKKIE......',
'.uwADDDDDDDCyu...........xCILMOOOPPONNMMLKKKKLMNOPPNL........................................LMOQOMMLKKKKLMMNOPQRRSSRQNJIIMXZZZZXUTI..IKNPRPLIJJHD......',
'.uwACDDDCCCBxu...........yCHKLMMMMMLKJJJJ....JJJLNONL........................................LNONLKJJ....JJJKKLNNNPQQRPLJILXZZZZWUTI..IKMOQOKIIIHD......',
'uwxABBAAAAAzxu..........wzDGJJJJJJJI............JKMLL........................................LMMKJI...........JJKKLNPQOMJJKWZZZYWUSI..IJLNPNKIHHGDA.....',
'yyzAzzyyyyyxwu...........yCFHGGH.................JKK.........................................KLKJ.................JKMNNMJ.KWZZZYWUSI...JKMOMJ.HHGEA.....'],
 k:['.............................................................................................................................ZZ.........................',
'..........................................................................................................................Z..ZRZ........................',
'......................................................................................................................ZZZZZ...ZZ........................',
'................................................................................................................Z....ZRIIRZ..ZRZ...ZZ...................',
'................................................................................................................ZZZZZRExIZ...ZIRZ..ZRZ..................',
'................................................................................................................ZIIIIExwIZ..ZREIZ.ZRERZ.................',
'................................................................................................................ZZRIExquERZZRExERZRExIZ.................',
'..................................................................................................................ZZREuqxEIIExqxEIExuERZ................',
'....................................................................................................................ZIwuwwwwwuqquwuqqxIZ................',
'...................................................................................................................ZRExEIIIIIExuwwwwuuERZ...............',
'...................................................................................................................ZREIRZZZZZREEIIIIExxERZZZ............',
'....................................................................................................................ZRZZ.....ZIRZZZZRExxEIIRZ...........',
'...................................................................................................................ZRZ......ZRIZ....ZRExERZRZ...........',
'...................................................................................................................ZZZ......ZIERZ....ZRERZ.ZZ...........',
'............................................................................................................................ZIxERZ....ZRZ...............',
'............................................................................................................................ZIwxIZ.....ZZ...............',
'............................................................................................................................ZIwwIZ......................',
'...........................................................................................................................ZREuwIZ......................',
'...........................................................................................................................ZRExxIZ......................',
'......................................................................ZZ...Z................................................ZREERZ......................',
'....................................................................ZZRRZZZRZZ...............................................ZIIZ.......................',
'..................................................................ZZRIEEIIIEIRZZZ............................................ZIIZ.......................',
'................................................................ZZRIExuuwwwuxEIIZ............................................ZIIZ.......................',
'...............................................................ZRIExuqmmnnnmquwERZ...........................................ZIIZ.......................',
'...............................................................ZIxuqmkhghhhhkmqxERZZ.........................................ZIIZ.......................',
'...............................................................ZIwnkhfdcddddfhlqxEIZ.........................................ZIIZ.......................',
'..............................................................ZREumgdcbaaaabcehlqwIZ.........................................ZIIZ.......................',
'..............................................................ZIxqkfcaaaaaaaacehnwIZ.........................................ZIIZ.......................',
'..............................................................ZIwnhdbaaaaaaaaacgmuERZ........................................ZIIZ.......................',
'.............................................................ZREumgcaaaaaaaaaacfkqxIZ........................................ZIIZ.......................',
'.............................................................ZIxqkfcaaaaaaaaaabdhnwIZ........................................ZIIZ.......................',
'.............................................................ZIwnhdbaaaaaaaaaaadhnwIZ........................................ZIIZ.......................',
'...ZZZ.......................................................ZIwnhdaaaaaaaaaaaadhnwIZ........................................ZIIZ.......................',
'...ZIZ.......................................................ZIwnhdaaaaaaaaaaaadhnwIZ........................................ZIERZ......................',
'..ZRERZ....................ZZ................................ZIwnhdaaaaaaaaaaaadhnwIZ........................................ZIxERZ.....................',
'..ZIxIZ......Z............ZRZ................................ZIwnhdaaaaaaaaaaaadhnwIZ........................................ZIwxERZ....................',
'..ZIwERZ....ZRZ...........ZIZ...............ZZZZZ............ZIwnhdaaaaaaaaaaaadhnwIZ.............ZZZZ.......................ZIwqxERZ...................',
'..ZIwxIZ...ZRERZ.........ZRIZ................ZIIRZZ.ZZZZZZZZZREumgcaaaaaaaaaaaacgmuERZZZZZZZZZZZZZRIIZ.......................ZIwnqxIZ...................',
'..ZIxuERZ...ZRZ.........ZREIZ...............ZRExEIRZRIIIIIIIIExqkfcaaaaaaaaaaaacfkqxEIIIIIIIIIIIIIExIZ.......................ZIwnmuERZ..................',
'..ZREuxIZ....Z.........ZRExIZ...............ZIxquxEIExwwwwwwwuqlhdbaaaaaaaaaaaabdhlquwwwwwwwwwwwwwuwIZ......................ZREumkqxIZ..................',
'...ZIwuERZ..ZZ..Z......ZIxxIZ...............ZIwnmquwuqnnnnnnnmkhecaaaaaaaaaaaaaacehkmnnnnnnnnnnnnnnwIZ......................ZIxqkhmuERZ.................',
'...ZIwqxERZZZ..ZRZZ...ZREuERZ...............ZIwnhkmnmkhhhhhhhgfdcaaaaaaaaaaaaaaaacdfghhhhhhhhhhhhhnwIZ......................ZIwnhfkqxIZ.................',
'...ZIwnqxEIIZ..ZIIZ..ZRExwIZ................ZIwnhfghgfdddddddccbaaaaaaaaaaaaaaaaaabccddddddddddddgmuERZ.....................ZIxqkfhnwIZ.................',
'...ZIxqlquwIZ..ZIERZZRExqwIZ...............ZREumgccdccbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxIZ.....................ZREumghnwIZ.................',
'...ZRExqknwIZ..ZIxEIIExqqxIZ...............ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdhnwIZ......................ZIwnhgmuERZ................',
'....ZREummuERZZREuuwwuqqxERZ...............ZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ.....................ZREumgfkqxIZ................',
'.....ZIwnkqxEIIExqmnnmqxERZ.................ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ.....................ZIxqkfdhnwIZ................',
'....ZREumhlquwwuqlhhhmuERZ.................ZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ.....................ZIwnhddhnwIZ................',
'.....ZIxqnmkmnnmkhefkqxIZ..................ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ.....................ZIwnhddhnwIZ................',
'.....ZRExwuqlhhgfdcgmuERZ..................ZIwnhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacgmuERZ....................ZIwnhddhnwIZ................',
'......ZRIIExqkfccbdhnwIZ...................ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxIZ....................ZIwnhddhnwIZ................',
'.......ZZZREumgcacehmuERZ.................ZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdhnwIZ....................ZIwnhddhnwIZ................',
'..........ZIwnhdcehlqxERZ.................ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ....................ZIwnhdcgmuERZ...............',
'.........ZREumgcdhlqxERZ..................ZIwnhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ....................ZIwnhdcfkqxIZ...............',
'........ZRExqkfcfkqxERZ...................ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ....................ZIwnhdbdhnwIZ...............',
'.........ZIxqkfcgmuERZ....................ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacgmuERZ...................ZIwnhdcfkqxIZ...............',
'.........ZREumgdhnwIZ....................ZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxIZ...................ZIwnhdehmuERZ...............',
'..........ZIwnhdhnwIZ....................ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdhmuERZ..................ZIwnhehlqxIZ................',
'.........ZREumgdhnwIZ....................ZIwnhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxERZZ................ZIwnhhlqxERZ................',
'........ZRExqkfdhnwIZ...................ZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdhlqxEIRZZZ.............ZIwnhkqxERZ.................',
'........ZIxqlhddhnwIZ...................ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacehlquxEIIRZZ.........ZZREumhmuERZ..................',
'.......ZREumhecdhnwIZ..................ZREumhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacehkmquwxEIRZ.......ZRIExqklqxIZ...................',
'.......ZIxqkfcacgmuERZ.................ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacdfhkmnquxERZ.....ZRExuqlkqxERZ...................',
'......ZREumhdbacfkqxERZ................ZIwnhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabcdfghkmqxERZ...ZRExqmkhmuERZ....................',
'......ZIxqkfcacehkmqxIZ...............ZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabccdfhlqxERZZZRExqlhfkqxIZ.....................',
'.....ZRExqkfccehlquwwIZ...............ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabcehlqxEIIIExqlhegmuERZ.....................',
'....ZRZREumgcdhlqxEIIIZ...............ZIwnhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacehlquwwwuqlhedhnwIZ......................',
'.....Z.ZIwnhdfkqxERZZRRZ..............ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacehkmnnnmkhecdhnwIZ......................',
'.......ZIwnhdgmuERZ..ZZ...............ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacdfghhhgfdcadhnwIZ......................',
'......ZREumgdhnwIZ....................ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabccdddccbaadhnwIZ......................',
'..ZZZZRExqkfdhnwIZ...................ZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'...Z..ZIwnhddhnwIZ..................ZRExqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'...ZZZREumgdehmuERZZ...............ZRExqlhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'......ZIwnhhhlquxEIRZ..............ZIxqlhecaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'......ZIwnnnnqxEIExERZ............ZREumhecaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'......ZIwwwwwxERZRExERZ...........ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'......ZIIIIIIIRZ.ZRExIZ..........ZREumhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'......ZRZZZZZZZ...ZREIZ..........ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'.......Z...........ZIERZ.........ZIwnhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'...................ZREIZ.........ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'....................ZRERZ........ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'.....................ZIERZZZZZZZZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'.....................ZREEIIIIIIIIExqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'......................ZREwwwwwwwwuqlhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'.......................ZIxuqnnnnnmkhecaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'.......................ZRIExqkhhhgfdcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'........................ZZREumgddccbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'..........................ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'..........................ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'....................ZZZZZZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'...................ZRIIIIIExqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'...................ZIxwwwwuqlhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'...................ZIwnnnnmkhecaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'..................ZREumhhhgfdcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'..................ZIxqkfddccbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'..................ZIwnhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'..................ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'..................ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'.................ZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'.................ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'.................ZIwnhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'.................ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ......................',
'................ZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacgmuERZ.....................',
'................ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxIZ.....................',
'................ZIwnhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdhmuERZ....................',
'................ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxERZ...................',
'................ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdhlqxERZ..................',
'................ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacehlqxIZ..................',
'...............ZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacehmuERZ.................',
'...............ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxIZ.................',
'...............ZIwnhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdhmuERZ................',
'...............ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxERZZ..............',
'..............ZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdhlqxEIRZ.............',
'..............ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxEIIERZ............',
'..............ZIwnhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacgmuERZZRERZ...........',
'..............ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ..ZIIZ...........',
'.............ZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacgmuERZ.ZRERZ..........',
'.............ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxIZ..ZRIZ..........',
'.............ZIwnhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdhmuERZ..ZRRZ.........',
'.............ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxIZ...ZZ..........',
'.............ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdhmuERZ..............',
'.............ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxIZ..............',
'............ZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdhnwIZ..............',
'............ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ..Z...........',
'............ZIwnhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacgmuERZ.ZZ..........',
'............ZIwnhecaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxIZ..ZZ.........',
'............ZIwqlhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdhmuERZ.ZRZ........',
'...........ZRIExqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxIZ..ZZ........',
'...........ZZZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdhnwIZ..ZRZ.......',
'..............ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacgmuERZ.ZRRZ......',
'..............ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxIZ..ZIRZ.....',
'.............ZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdhmuERZ.ZIIZ.....',
'.............ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxIZ.ZRERZ....',
'.............ZIwnhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdhnwIZ..ZIIZ....',
'.............ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ..ZRIZ....',
'.............ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacgmuERZ..ZIZ....',
'............ZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxIZ..ZRRZ...',
'............ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdhnwIZ...ZZ....',
'............ZIwnhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacgmuERZ..ZZ....',
'............ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxIZ........',
'............ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdhnwIZ........',
'............ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacgmuERZ.......',
'...........ZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabccddccbaacfkqxIZ.......',
'...........ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacdfghhgfdcabdhmuERZ......',
'...........ZIwnhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacehkmnnmkhecacfkqxIZ......',
'...........ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabdhlquwwuqlhdbbdhnwIZ......',
'...........ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacfkqxEIIExqkfcacgmuERZ.....',
'...........ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacgmuERZZREumgcacfkqxIZ.....',
'..........ZREumgcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ..ZIwnhdabdhnwIZ.....',
'..........ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ..ZIwnhdaacgmuERZ....',
'.......ZZZREumhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ..ZIwnhdaacfkqxIZ....',
'.......ZIIExqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ..ZIwnhdaabdhnwIZ....',
'......ZREwuqlhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ..ZIwnhdaaacgmuERZ...',
'......ZIxqmkhecaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabccdddddddccbaaaaaaaaaaaaaaaaaaaaaaadhnwIZ..ZIwnhdaaacfkqxIZ...',
'......ZIwnhfdcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabccddfghhhhhhhgfdcaaaaaaaaaaaaaaaaaaaaaadhnwIZ..ZIwnhdaaabdhnwIZ...',
'......ZIwnhdbbccddddddddddccbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabccddfghhkmnnnnnnnmkhecaaaaaaaaaaaaaaaaaaaaadhnwIZ..ZIwnhdaaaacgmuERZ..',
'......ZIwnhdcdfghhhhhhhhhhgfdcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabccddfghhkmnnquwwwwwwwuqlhdbaaaaaaaaaaaaaaaaaaaacgmuERZ.ZIwnhdaaaacfkqxIZ..',
'.....ZREumgcehkmnnnnnnnnnnmkhecaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabccddfghhkmnnquwwxEIIIIIIIExqkfcaaaaaaaaaaaaaaaaaaaacfkqxIZ.ZIwnhdaaaabdhmuERZ.',
'.....ZIxqkfdhlquwwwwwwwwwwuqlhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabccddfghhkmnnquwwxEIIIRZZZZZZZREumgcaaaaaaaaaaaaaaaaaaaabdhnwIZ.ZIwnhdaaaaacfkqxIZ.',
'.....ZIwnhdfkqxEIIIIIIIIIIExqkfcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabccdfghhkmnnquwwxEIIIRZZZZ.......ZIwnhdaaaaaaaaaaaaaaaaaaaaadhnwIZ.ZIwnhdaaaaabdhnwIZ.',
'.....ZIwnhdgmuERZZZZZZZZZZREumhdbaaaaaaaaaaaaaaaaaaaaaaaaaaaabccdddfghkmnnquwwxEIIIRZZZZ.........ZZREumgcaaaaaaaaaaaaaaaaaaaaadhnwIZ.ZIwnhdaaaaaadhnwIZ.',
'....ZREumgdhnwIZ..........ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaabccdddfghhhkmnquwwxEIIIRZZZZ............ZRIExqkfcaaaaaaaaaaaaaaaaaaaaadhnwIZ.ZIwnhdaaaaaacgmuERZ',
'....ZIxqkfdhnwIZ..........ZREumgcaaaaaaaaaaaaaaaabccdddddfghhhkmnnnquwxEIIIRZZZZ................ZIxuqlhdbaaaaaaaaaaaaaaaaaaaaadhnwIZ.ZIwnhdbaaaaacfkqxEI',
'....ZIwnhddhnwIZ...........ZIwnhdaaaaaaaaaaaaaabcdfghhhhhkmnnnquwwwxEIIRZZZZ....................ZIwnkhecaaaaaaaaaaaaaaaaaaaaaadhnwIZ.ZIxqkfcaaaaabdhlquw',
'....ZIwnhddhnwIZ...........ZIwnhdaaaaaaaaaaaaacdfhkmnnnnnquwwwxEIIIIRZZZ........................ZIwnhdcaaaaaaaaaaaaaaaaaaaaaaadhnwIZ.ZREumgcaaaaabdhlquw',
'....ZIwnhddhnwIZ...........ZIwnhdaaaaaaaaaaaacehkmquwwwwwxEIIIIRZZZZZ..........................ZREumgcaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ..ZIwnhdaaaaacfkqxEI',
'...ZREumgcdhnwIZ..........ZREumgcaaaaaaaaaaabdhlquxEIIIIIIRZZZZZ...............................ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ..ZIwnhdaaaabdhmuERZ',
'...ZIxqkfcfkqxIZ..........ZIxqkfcaaaaaaaaaaacfkqxEIRZZZZZZZ....................................ZIwnhdbaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ..ZIwnhdaaaacfkqxIZ.',
'...ZIwnhdcgmuERZ..........ZIwnhdbaaaaaaaaaaacgmuERZZ...........................................ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ..ZIwnhdaaabdhmuERZ.',
'...ZIwnhddhnwIZ...........ZIwnhdaaaaaaaaaaaadhnwIZ.............................................ZIwnhdaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ..ZIwnhdaaacfkqxIZ..',
'...ZIwnhddhnwIZ...........ZIwnhdaaaaaaaaaaaadhnwIZ............................................ZREumgcaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ..ZIwnhdaacehmuERZ..',
'...ZIwnhddhnwIZ...........ZIwnhdaaaaaaaaaaaacgmuERZ...........................................ZIxqkfcaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ..ZIwnhdabdhlqxIZ...',
'..ZREumgcfkqxIZ...........ZIwnhdaaaaaaaaaaaacfkqxERZ..........................................ZIwnhdbaaaaaaaaaaaaaaaaaaaaaaaaadhnwIZ..ZIwnhdacfkqxERZ...',
'..ZIxqkfcgmuERZ..........ZREumgcaaaaaabccdddddhlqxIZ..........................................ZIwnhdcddddccbaaaaaaaaaaaaaaaaaadhnwIZ..ZIwnhdbdhmuERZ....',
'..ZIwnhddhnwIZ...........ZIxqkfcabccdddfghhhhgfhnwIZ..........................................ZIwnhfghhhhgfdddccbaaaaaaaaaaaaadhnwIZ..ZIwnhdcfkqxIZ.....',
'..ZIwnhddhnwIZ...........ZIwnhdcddfghhhkmnnnnmkhnwIZ..........................................ZIwnhkmnnnnmkhhhgfddccbabccdccbadhnwIZ..ZIwnhdcgmuERZ.....',
'.ZREumgcdhnwIZ...........ZIwnhfghhkmnnnquwwwwuqnnwIZ..........................................ZIwnmquwwwwuqnnnmkhhgfdcdfghgfdcdhnwIZ..ZIwnhfghnwIZ......',
'.ZIxqkfcdhnwIZ...........ZIwnhkmnnquwwwxEIIIIExwuuERZ.........................................ZIwquxEIIIIExwwwuqnnmkhehkmnmkhedhnwIZ..ZIwnhkmnnwIZ......',
'.ZIwnhdbdhnwIZ...........ZIwnlquwwxEIIIIRZZZZRIIExxIZ........................................ZREuxEIRZZZZRIIIIExwwuqlhlquwuqlhdhnwIZ..ZIwnlquwuwIZ......',
'.ZIwnhdadhnwIZ...........ZIwnqxEIIIRZZZZZ....ZZZRExIZ........................................ZIxEIRZZ....ZZZZZRIIIExqkqxEIExqkfhnwIZ..ZIxqqxEIExIZ......',
'ZREumgcadhnwIZ..........ZREumuERZZZZ............ZRERZ........................................ZIERZZ...........ZZZZREumuERZREumghnwIZ..ZREuuERZREERZ.....',
'IExqkfcadhnwIZ...........ZIwnwIZ.................ZIZ.........................................ZIIZ.................ZIwnwIZ.ZIwnhhnwIZ...ZIwwIZ.ZIxIZ.....']};
/*
 * Greece — "Colossus of Rhodes & Statue of Zeus" (greece-colossus-zeus). First scenery of Greece, fourth of the Ancient Seven.
 *
 * A harbour town on Rhodes: the bronze Colossus of Helios straddles the harbour mouth on two brick moles, torch raised, ships sailing
 * under his legs; on the left stands a Doric temple at Olympia with the seated chryselephantine Zeus (Nike on his hand, eagle sceptre)
 * visible between the columns. Both statues are traced cell by cell from reference pictures (tools/stages/extract_figure.py):
 * COL_G and ZEUS_G hold palette-coded colour grids that are extruded into rounded voxel bodies.
 * Animated: harbour and bay water (ripples, glints, foam), ships under the Colossus, gulls, townsfolk, incense smoke, torch flame.
 * Ten differences spread around the scene; four are lights that look the same by day.
 */
function createStage(E) {
  const { Mesh, BasicMaterial, PointLight, Color, hash } = E;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const G = 1.0, SEA = 0.4, COAST = 9;
  const CX = 9, BASIN = [5, 13];                          // Colossus centre x; harbour channel x range (z -12 .. 9)
  const Z = [-13.2, -1.5], TY = 1.4, CZ = -4;                     // Zeus temple centre, terrace top
  const inBasin = (x, z) => x > BASIN[0] && x < BASIN[1] && z > -14 && z <= COAST;
  const hillH = (x, z) => {
    const back = smooth(-15, -22.5, z), pk = Math.exp(-((x - 22) * (x - 22) + (z + 20) * (z + 20)) / 30) * 7.0;
    return back * (2.0 + 1.5 * Math.sin(x * 0.31) + 0.9 * Math.sin(x * 0.85 + 1)) + pk * smooth(-12, -20, z);
  };
  const top = (x, z) => G + Math.max(0, Math.floor(hillH(x, z) * 2) / 2);
  function height(x, z) {
    if (z > COAST || inBasin(x, z)) return 0.5;
    if (x >= Z[0] - 9.6 && x <= Z[0] + 9.6 && z >= Z[1] - 9 && z <= Z[1] + 9) return TY;
    return top(x, z);
  }
  const mix = (a, b, t) => { const r = (a >> 16 & 255) + ((b >> 16 & 255) - (a >> 16 & 255)) * t, g = (a >> 8 & 255) + ((b >> 8 & 255) - (a >> 8 & 255)) * t, bl = (a & 255) + ((b & 255) - (a & 255)) * t; return (r | 0) << 16 | (g | 0) << 8 | (bl | 0); };
  const GRASS = [0x86b251, 0x92bd58, 0x78a847, 0x9bc460], HILL = [0x9a9a62, 0xa6a46c, 0x8a9358, 0xb4a878], ROCKP = [0xb8a090, 0xa89080, 0xc8b0a0];
  const LEAF = [0x2f7a3a, 0x3d8f45, 0x4aa04c, 0x58b055], OLIVE = [0x7a9552, 0x8aa45e, 0x6a8848], MARBLE = 0xf0e8d8, MARBLE2 = 0xdcd2bc, GOLD = 0xdcaa3c, STONE = 0xdccfae;
  const FLOWER = [0xe85a9a, 0xb565d9, 0xf2c83a, 0xf5f0e6, 0xe8743a], PAVE = [0xe9d6b8, 0xddc8a4], BRICK = [0xc9a06c, 0xb98c58, 0xd6b07a];
  const D = {
    olive: [22, -4], lantern: [21, 8.5], ship: [-4, 16], awning: [-3.5, 6.5], gardenlamp: [-22.5, 8.2], goats: [-24.2, -14],
    beacon: [-21, -19], banner: [-2, -19], flame: [3, -17.5], cypress: [19, -15],
  };

  function build(ctx, variant) {
    const { box: g, group: o, makeDiff: B } = ctx;
    const U = ctx.world.userData;
    const pick = (arr, a, b) => arr[Math.floor(hash(a, b) * arr.length)];
    const motion = (grp) => { grp.userData.motion = true; return grp; };
    U.wallLights = []; U.ripples = []; U.glints = []; U.foam = []; U.ships = []; U.people = []; U.gulls = []; U.smoke = []; U.flames = []; U.zrip = [];

    function lamp(x, y, z, sx, sy, sz, dayColor, nightColor, opts = {}) {
      const m = new Mesh(ctx.cube, new BasicMaterial(opts.alpha !== undefined ? { color: dayColor, transparent: true, opacity: opts.alpha, depthWrite: false } : { color: dayColor }));
      m.position.set(x, y, z); m.scale.set(sx, sy, sz);
      m.userData.ownedMaterial = true; m.userData.motion = true;
      if (!opts.pickable) m.raycast = () => {};
      (opts.parent || ctx.world).add(m);
      U.wallLights.push({ m, day: dayColor, night: nightColor });
      return m;
    }
    const person = (parent, x, y, z, c) => { const p = motion(o(x, y, z)); parent.add(p); g(0, 0.45, 0, 0.3, 0.9, 0.24, c, p); g(0, 1.08, 0, 0.26, 0.26, 0.26, 0xe8c9a0, p); g(0, 1.27, 0, 0.32, 0.12, 0.32, 0x3a2f27, p); return p; };
    function cypress(parent, x, y, z, h = 3.4) { g(x, y + h / 2, z, 0.8, h, 0.8, 0x1f5a2f, parent); g(x, y + h + 0.3, z, 0.5, 0.8, 0.5, 0x1f5a2f, parent); g(x, y + h * 0.3, z, 1.1, h * 0.4, 1.1, 0x246a35, parent); }
    function olive(parent, x, y, z, s) { g(x, y + 0.6, z, 0.3, 1.2, 0.3, 0x6b4a33, parent); g(x, y + 1.6, z, 1.7, 1.1, 1.7, pick(OLIVE, s, 3), parent); g(x + 0.1, y + 2.35, z, 1.1, 0.7, 1.1, pick(OLIVE, s, 4), parent); }
    function bush(parent, x, y, z, s, flowers) { g(x, y + 0.4, z, 1.2, 0.8, 1.2, pick(LEAF, s, 10), parent); if (flowers) for (let i = 0; i < 4; i++) g(x + (hash(s, i) - 0.5) * 0.9, y + 0.85, z + (hash(i, s) - 0.5) * 0.9, 0.22, 0.2, 0.22, pick(FLOWER, s, i), parent); }
    function ship(parent, sail, stripe) {
      const b = motion(o(0, 0, 0)); parent.add(b);
      g(0, 0.3, 0, 3.6, 0.5, 1.1, 0x7a4a28, b); g(1.9, 0.6, 0, 0.6, 0.6, 0.8, 0x7a4a28, b); g(-1.9, 0.8, 0, 0.5, 0.9, 0.8, 0x5a3a20, b); g(0, 0.58, 0, 3.2, 0.1, 0.9, 0xc9a06a, b);
      g(0, 2.3, 0, 0.12, 3.4, 0.12, 0x5a3f28, b); g(0.1, 2.55, 0, 0.1, 2.2, 2.2, sail, b); g(0.16, 2.6, 0, 0.05, 0.42, 2.2, stripe, b); g(0.1, 3.7, 0, 0.1, 0.1, 2.7, 0x5a3f28, b);
      person(b, -1.3, 0.62, 0, stripe);
      return b;
    }
    function house(x, z, w, d, h, roof, y0 = G) {
      g(x, y0 + h / 2, z, w, h, d, 0xf3eee2); g(x, y0 + h + 0.15, z, w + 0.3, 0.3, d + 0.3, roof);
      for (let i = 0; i < Math.max(1, Math.floor(w / 1.3)); i++) { const wx = x - w / 2 + 0.7 + i * 1.3; g(wx, y0 + h * 0.6, z + d / 2 + 0.03, 0.4, 0.55, 0.05, 0x2e6fb8); }
      g(x, y0 + 0.5, z + d / 2 + 0.03, 0.5, 1.0, 0.05, 0x6b4a33);
    }
    function column(x, y0, z, h, w) { g(x, y0 + 0.1, z, w * 1.4, 0.2, w * 1.4, MARBLE2); g(x, y0 + 0.2 + (h - 0.5) / 2, z, w, h - 0.5, w, MARBLE); g(x, y0 + h - 0.15, z, w * 1.5, 0.3, w * 1.5, MARBLE2); }
    // Traced statue: every cell of the photo grid becomes one box column with its own colour, front depth (rounded body + carved folds) and back depth.
    // All boxes of a statue are merged into ONE vertex-coloured, flat-shaded mesh with a day and a night colour per vertex (same pipeline as the Christ statue).
    const BufGeo = Object.getPrototypeOf(ctx.cube.constructor), Attr = ctx.cube.attributes.position.constructor;
    const ABC = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', CREAM = new Color(0xfff1cf), tmpC = new Color();
    const FACEK = { top: 1.0, px: 0.92, nx: 0.7, front: 0.84, bottom: 0.5, back: 0.68 };
    function tracedStatue(T, cx, y0, cz, lift = 1, warm = 0.3, tint = 0xfff1cf) {
      const NT = new Color(tint);
      const { cols, rows, s } = T, [f0, f1] = T.fr, [k0, k1] = T.kr;
      const zf = [], zk = [], cc = [];
      const tone = (c) => { if (lift === 1) return c; const r = Math.min(255, (c >> 16 & 255) * lift), g2 = Math.min(255, (c >> 8 & 255) * lift), b = Math.min(255, (c & 255) * lift); return mix((r | 0) << 16 | (g2 | 0) << 8 | (b | 0), 0xe8b050, warm); };
      const pal = T.pal.map(tone);
      for (let j = 0; j < rows; j++) { zf.push([]); zk.push([]); cc.push([]); for (let i = 0; i < cols; i++) { const ch = T.c[j][i]; if (ch === '.') { zf[j].push(null); zk[j].push(null); cc[j].push(0); continue; } zf[j].push(f0 + (f1 - f0) * (ABC.indexOf(T.f[j][i]) + 0.5) / 52); zk[j].push(k0 + (k1 - k0) * (ABC.indexOf(T.k[j][i]) + 0.5) / 52); cc[j].push(pal[ABC.indexOf(ch)]); } }
      const pos = [], dayC = [], nightC = [], idx = [];
      const quad = (v, col, f) => {
        tmpC.set(col); const lum = 0.3 * tmpC.r + 0.59 * tmpC.g + 0.11 * tmpC.b, kN = 0.38 + 0.62 * clamp((lum - 0.1) / 0.65, 0, 1), b0 = pos.length / 3;
        for (const p of v) { pos.push(p[0], p[1], p[2]); dayC.push(tmpC.r * f, tmpC.g * f, tmpC.b * f); const fn = kN * (0.55 + 0.45 * f); nightC.push(NT.r * fn, NT.g * fn, NT.b * fn); }
        idx.push(b0, b0 + 1, b0 + 2, b0, b0 + 2, b0 + 3);
      };
      const at = (j, i) => (j < 0 || j >= rows || i < 0 || i >= cols) ? null : zf[j][i];
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const F = zf[j][i]; if (F === null) continue;
        const K = zk[j][i], col = cc[j][i], xa = cx + (i - cols / 2) * s, xb = xa + s, yt = y0 + (rows - j) * s, yb = yt - s, z = cz;
        quad([[xa, yb, z + F], [xb, yb, z + F], [xb, yt, z + F], [xa, yt, z + F]], col, FACEK.front);
        quad([[xa, yb, z + K], [xb, yb, z + K], [xb, yt, z + K], [xa, yt, z + K]], mix(col, 0x403830, 0.35), FACEK.back);
        for (const [dj, di, face] of [[-1, 0, 'top'], [1, 0, 'bottom'], [0, 1, 'px'], [0, -1, 'nx']]) {
          const nF = at(j + dj, i + di), nK = nF === null || nF === undefined ? null : zk[j + dj][i + di];
          const segs = nF === null || nF === undefined ? [[K, F]] : [].concat(F > nF + 0.004 ? [[nF, F]] : [], K < nK - 0.004 ? [[K, nK]] : []);
          for (const [za, zb] of segs) {
            let v;
            if (face === 'top') v = [[xa, yt, z + za], [xb, yt, z + za], [xb, yt, z + zb], [xa, yt, z + zb]];
            else if (face === 'bottom') v = [[xa, yb, z + za], [xb, yb, z + za], [xb, yb, z + zb], [xa, yb, z + zb]];
            else if (face === 'px') v = [[xb, yb, z + za], [xb, yt, z + za], [xb, yt, z + zb], [xb, yb, z + zb]];
            else v = [[xa, yb, z + za], [xa, yt, z + za], [xa, yt, z + zb], [xa, yb, z + zb]];
            quad(v, col, FACEK[face]);
          }
        }
      }
      const geo = new BufGeo(), day = new Float32Array(dayC), colAttr = new Attr(new Float32Array(dayC), 3);
      geo.setAttribute('position', new Attr(new Float32Array(pos), 3)); geo.setAttribute('color', colAttr); geo.setIndex(idx);
      const mesh = new Mesh(geo, new BasicMaterial({ vertexColors: true, side: 2 }));
      mesh.userData.motion = true; mesh.userData.ownedMaterial = true; mesh.raycast = () => {}; mesh.frustumCulled = false;
      ctx.world.add(mesh);
      (U.statues = U.statues || []).push({ attr: colAttr, day, night: new Float32Array(nightC), glow: -1 });
      return mesh;
    }

    // ---------- harbour, bay, land, hills ----------
    const bottom = -2.4;
    g(0, (bottom + SEA - 0.08) / 2, 8, 52, SEA - 0.08 - bottom, 32, 0x1a5a96);
    g((BASIN[0] + BASIN[1]) / 2, (bottom + SEA - 0.08) / 2, -2.5, BASIN[1] - BASIN[0], SEA - 0.08 - bottom, 23, 0x1a5a96);
    lamp(0, SEA, 8.5, 52, 0.12, 31, 0x2f8fd0, 0x0b2142);
    lamp(9, SEA, -2.5, 8, 0.12, 22.6, 0x2f8fd0, 0x0b2142);
    for (let x = -25; x <= 25; x++) for (let z = COAST; z <= COAST + 2; z++) g(x, SEA + 0.09, z + 0.5, 1.02, 0.04, 1.02, mix(0x56d0dc, 0x2f8fd0, (z - COAST) / 3));
    // land: left bank, right bank, back strip behind the harbour
    for (const [x0, x1, z0, z1] of [[-26, BASIN[0], -22, 9], [BASIN[1], 26, -22, 9], [BASIN[0], BASIN[1], -22, -14]]) {
      g((x0 + x1) / 2, (bottom + G) / 2 - 0.05, (z0 + z1) / 2, x1 - x0, G - bottom - 0.1, z1 - z0, 0x8a6a45);
    }
    g(-10.5, (-0.7 + G) / 2, COAST + 0.1, 31, G + 0.7, 0.3, 0xcfc4a8); g(19.5, (-0.7 + G) / 2, COAST + 0.1, 13, G + 0.7, 0.3, 0xcfc4a8);
    for (const x of [BASIN[0], BASIN[1]]) g(x, (-0.7 + G) / 2, -2.5, 0.3, G + 0.7, 23, 0xcfc4a8);                // quay walls of the channel
    g(9, (-0.7 + G) / 2, -14.1, 8, G + 0.7, 0.3, 0xcfc4a8);
    for (let x = -25; x <= 25; x += 2) for (let z = -12; z <= 8; z += 2) {
      if (inBasin(x - 1 + 1, z) || inBasin(x + 1, z) || inBasin(x - 1, z) || (x > BASIN[0] - 1 && x < BASIN[1] + 1)) continue;
      if (z >= 4.5 && z <= 8) continue; if (x >= Z[0] - 10.5 && x <= Z[0] + 10.5 && z >= Z[1] - 9.8 && z <= Z[1] + 9.8) continue;
      g(x, G - 0.07, z, 2.02, 0.2, 2.02, hash(x, z) > 0.2 ? pick(GRASS, x, z) : pick(HILL, x, z));
    }
    for (let x = -25; x <= 25; x++) for (let z = -22; z <= -13; z++) {
      const h = top(x, z), pk = Math.exp(-((x - 22) * (x - 22) + (z + 20) * (z + 20)) / 30) * 7 > 2.2 && h > 4;
      if (h <= G + 0.01 && z > -17) continue; if (Math.abs(x - Z[0]) < 10.6 && Math.abs(z - Z[1]) < 9.8) continue; if (inBasin(x, z)) continue;
      g(x, (bottom + h) / 2 - 0.05, z, 1.02, h - bottom - 0.1, 1.02, pk ? pick(ROCKP, x, z) : pick(HILL, x, z));
    }
    for (let x = -25; x <= 25; x++) for (let z = 5; z <= 8; z++) { if (x > BASIN[0] - 0.5 && x < BASIN[1] + 0.5) continue; g(x, G - 0.02, z, 1.02, 0.14, 1.02, ((x + z) & 1) ? PAVE[0] : PAVE[1]); }
    for (let x = -24; x <= 24; x += 3.2) { if (x > BASIN[0] - 1 && x < BASIN[1] + 1) continue; g(x, 0.75, COAST + 0.3, 0.3, 0.35, 0.3, 0x5a3f28); }

    // ---------- the Colossus of Rhodes: two brick moles, traced bronze body, torch ----------
    {
      const base = G + 0.6, PX = [3.4, 14.6];
      for (const px of PX) {
        g(px, (base + G - 0.2) / 2, CZ, 4.6, base - G + 0.8, 4.4, BRICK[0]);
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const k = (r + c) & 1; g(px - 1.65 + c * 1.1, G + 0.05 + r * 0.38, CZ + 2.25, 1.08, 0.36, 0.08, BRICK[k]); g(px + 2.35, G + 0.05 + r * 0.38, CZ - 1.5 + c * 1.0, 0.08, 0.36, 1.0, BRICK[k + 1]); }
        g(px, base + 0.22, CZ, 5.0, 0.3, 4.8, 0xb08a58); g(px, base + 0.5, CZ, 3.8, 0.25, 3.6, 0xd6b078);
      }
      g(9, base + 0.2, CZ, 12, 0.14, 1.0, 0x8a6a45);
      const y0 = base + 0.62, cs = COL_G.s, ccx = 9 - (66.5 - COL_G.cols / 2) * cs;       // feet (grid columns ~20 and ~113) land on the pedestals
      tracedStatue(COL_G, ccx, y0, CZ, 1.3, 0.25, 0xe0a040);
      // flame in the raised bowl: above the topmost traced cell
      let fj = 0; while (COL_G.c[fj].replace(/\./g, '') === '') fj++;
      const fi = COL_G.c[fj].search(/[^.]/) + 4;
      const fx = ccx + (fi + 0.5 - COL_G.cols / 2) * cs, fy = y0 + (COL_G.rows - fj) * cs + 0.5;
      U.flames.push(lamp(fx, fy, CZ, 0.8, 1.0, 0.8, 0xe0a030, 0xffa83a));
      U.flames.push(lamp(fx, fy + 0.8, CZ, 0.45, 0.9, 0.45, 0xf0c050, 0xffd070));
      for (let k = 0; k < 4; k++) U.smoke.push({ m: lamp(fx, fy, CZ, 0.5, 0.5, 0.5, 0x8a8a90, 0x4a4a58, { alpha: 0.3 }), ph: k / 4, ox: fx, oy: fy + 0.6, oz: CZ, rise: 5, drift: 1.2 });
    }

    // ---------- Temple of Olympian Zeus (Doric) with the seated statue ----------
    {
      const [cx, cz] = Z, hw = 8.6, hl = 7.4, ch = 11.5, y0 = TY + 1.05;
      g(cx, (TY - bottom) / 2 + bottom / 2, cz, 2 * hw + 2.6, TY - bottom - 0.1, 2 * hl + 2.6, 0xcfb894);
      for (let x = -hw - 1.2; x < hw + 1.3; x += 1.5) for (let z = -hl - 1.2; z < hl + 1.3; z += 1.5) g(cx + x, TY - 0.03, cz + z, 1.52, 0.12, 1.52, (((x + z) / 1.5 | 0) & 1) ? PAVE[0] : PAVE[1]);
      for (let i = 0; i < 3; i++) g(cx, TY + 0.175 + i * 0.35, cz, 2 * (hw + 1.2 - i * 0.4), 0.35, 2 * (hl + 1.2 - i * 0.4), i % 2 ? MARBLE2 : MARBLE);
      // cella: back and left walls only so the statue shows between the columns
      g(cx, y0 + ch / 2, cz - hl + 1.8, 2 * hw - 3.4, ch, 0.9, 0xe2d4b6); g(cx - hw + 1.9, y0 + ch / 2, cz, 0.9, ch, 2 * hl - 3.0, 0xe2d4b6);
      for (let i = 0; i < 5; i++) g(cx + (i - 2) * 2.4, y0 + 3.2, cz - hl + 2.3, 1.6, 5.0, 0.1, [0x2e4f8f, 0xc0503a][i & 1]);       // painted back-wall panels
      for (let x = -hw + 1; x < hw; x += 1.5) for (let z = -hl + 1; z < hl; z += 1.5) g(cx + x, y0 - 0.03, cz + z, 1.5, 0.06, 1.5, (((x + z) / 1.5 | 0) & 1) ? 0xd8c8a4 : 0xe8dcc0);
      // Doric colonnade
      for (let i = 0; i < 8; i++) { const x = -hw + 0.7 + i * ((2 * hw - 1.4) / 7); for (const z of [hl - 0.7, -hl + 0.7]) column(cx + x, y0, cz + z, ch, 0.9); }
      for (let i = 1; i < 7; i++) { const z = -hl + 0.7 + i * ((2 * hl - 1.4) / 7); for (const x of [-hw + 0.7, hw - 0.7]) column(cx + x, y0, cz + z, ch, 0.9); }
      const yE = y0 + ch;
      const ring = (y, hgt, ex, wd, col) => { g(cx, y, cz + hl + ex - wd / 2, 2 * hw + 2 * ex, hgt, wd, col); g(cx, y, cz - hl - ex + wd / 2, 2 * hw + 2 * ex, hgt, wd, col); g(cx + hw + ex - wd / 2, y, cz, wd, hgt, 2 * hl + 2 * ex, col); g(cx - hw - ex + wd / 2, y, cz, wd, hgt, 2 * hl + 2 * ex, col); };
      ring(yE + 0.4, 0.8, 0.1, 1.5, MARBLE);
      for (let side = 0; side < 4; side++) {
        const len = side % 2 === 0 ? 2 * hw : 2 * hl, n = Math.round(len / 1.1);
        for (let c = 0; c < n; c++) {
          const u = -len / 2 + (c + 0.5) * len / n, col = (c & 1) ? 0x2e4f8f : 0xe6d6b0, hh = 0.55;
          if (side === 0) g(cx + u, yE + 0.5, cz + hl + 0.14, len / n * 0.9, hh, 0.08, col); else if (side === 1) g(cx + hw + 0.14, yE + 0.5, cz - u, 0.08, hh, len / n * 0.9, col);
          else if (side === 2) g(cx - u, yE + 0.5, cz - hl - 0.14, len / n * 0.9, hh, 0.08, col); else g(cx - hw - 0.14, yE + 0.5, cz + u, 0.08, hh, len / n * 0.9, col);
        }
      }
      ring(yE + 1.0, 0.35, 0.4, 1.0, GOLD);
      const yR = yE + 1.15;                                         // gabled roof along z with sculpted pediments
      const rz0 = cz - hl - 0.4, rz1 = cz - 4.6, rzc = (rz0 + rz1) / 2, rl = rz1 - rz0;          // roof covers the rear half only: the front stays open to show Zeus
      for (let i = 0; i < 12; i++) { const w = hw + 0.4 - i * 0.7; if (w > 0) g(cx, yR + i * 0.32 + 0.16, rzc, 2 * w, 0.32, rl, i % 2 ? 0xcf9b72 : 0xd9a67e); }
      g(cx, yR + 12 * 0.32 + 0.1, rzc, 0.5, 0.2, rl, 0xb8704a);
      for (const z of [cz - 3.6, cz + hl - 0.2]) g(cx, yE + 1.35, z, 2 * hw + 0.4, 0.3, 0.4, 0x9a6a40);
      for (const sz of [-1]) {
        for (let r = 0; r < 12; r++) { const w = (hw + 0.2) * 2 * (1 - (r + 0.5) / 12.5); g(cx, yR + r * 0.32 + 0.16, cz + sz * (hl + 0.35), w, 0.34, 0.12, 0x3a5f9f); }
        for (let k = -3; k <= 3; k++) { const hgt = 1.5 - Math.abs(k) * 0.18; g(cx + k * 1.3, yR + hgt / 2 + 0.2, cz + sz * (hl + 0.45), 0.55, hgt, 0.14, k & 1 ? 0xf3e4c0 : 0xdcaa3c); g(cx + k * 1.3, yR + hgt + 0.45, cz + sz * (hl + 0.45), 0.36, 0.36, 0.14, 0xf3e4c0); }
        g(cx, yR + 12 * 0.32 + 0.5, cz + sz * hl, 0.6, 0.7, 0.6, GOLD);
      }
      // Zeus on his throne: traced grid, throne plinth and footstool
      const px = cx - 0.5, pz = cz - 1.8, ph = 1.0;
      g(px, y0 + ph / 2, pz, 8.2, ph, 5.6, 0xd6b878); g(px, y0 + ph + 0.1, pz, 8.8, 0.2, 6.2, GOLD);
      for (let k = 0; k < 7; k++) g(px - 3.3 + k * 1.1, y0 + 0.7, pz + 2.85, 0.8, 0.8, 0.06, k & 1 ? 0x2e4f8f : 0xdcaa3c);
      g(px, y0 + ph + 0.2 + 4.4, pz - 0.9, 7.2, 8.8, 0.6, 0x7a5e32);                      // throne back
      tracedStatue(ZEUS_G, px, y0 + ph + 0.2, pz, 1, 0);
      for (const sx of [-1, 1]) { g(px + sx * 5.0, y0 + 0.7, pz + 2.6, 0.9, 1.4, 0.9, MARBLE2); U.flames.push(lamp(px + sx * 5.0, y0 + 1.7, pz + 2.6, 0.8, 0.5, 0.8, 0xd0883a, 0xffa040)); }
      for (let k = 0; k < 3; k++) for (const sx of [-1, 1]) U.smoke.push({ m: lamp(px + sx * 5, y0 + 1.7, pz + 2.6, 0.5, 0.5, 0.5, 0x9a9aa0, 0x5a5a68, { alpha: 0.3 }), ph: k / 3 + (sx > 0 ? 0.17 : 0), ox: px + sx * 5, oy: y0 + 2.0, oz: pz + 2.6, rise: 7, drift: 0.8 });
      for (const [x, z] of [[-hw - 3.2, hl - 2], [-hw - 3.2, -hl + 2], [hw + 3.4, hl + 0.5]]) cypress(ctx.world, cx + x, G + 0.2, cz + z, 3.8);
      for (let i = 0; i < 6; i++) bush(ctx.world, cx + hw + 2.2 + (i % 2) * 1.3, G, cz - 9 + Math.floor(i / 2) * 3.4, 300 + i, true);
    }

    // ---------- Rhodes town on the east bank, harbour furniture ----------
    for (const [x, z, w, d, h, r] of [[16.5, -9, 3, 3.2, 2.2, 0xc86a3c], [20.5, -8.5, 3.4, 3, 2.8, 0x2e6fb8], [24, -9, 2.6, 3, 2.0, 0xc86a3c], [17, -4.2, 2.8, 2.8, 2.6, 0x2e6fb8], [21, -3.5, 3.4, 3, 2.2, 0xc86a3c], [24.3, -3.5, 2.2, 3, 2.9, 0xc86a3c], [18, 1.2, 3, 2.6, 2.0, 0x2e6fb8], [22, 2.6, 3.2, 3, 2.6, 0xc86a3c], [18.5, 5.6, 2.8, 2.4, 1.8, 0xc86a3c]]) house(x, z, w, d, h, r);
    g(19.6, G + 3.4, -4.4, 1.9, 0.8, 1.9, 0x2e6fb8); g(19.6, G + 4.0, -4.4, 1.2, 0.6, 1.2, 0xf3eee2);   // little dome
    for (const [x, z, w, d, h, r] of [[-25, 4.5, 1.8, 2.4, 1.6, 0xc86a3c], [-2.4, 3.6, 2.4, 2.4, 1.9, 0x2e6fb8]]) house(x, z, w, d, h, r);
    for (const [x, z] of [[-24, 1], [-23.5, -14], [25, -14], [8, -15.5], [14.5, -16.5], [-8, -18.5], [11, -18], [-14, -19]]) cypress(ctx.world, x, top(x, z), z, 3.2 + hash(x, z));
    for (const [x, z] of [[-1, 5.8], [-16, 6.2], [24, 6], [-9, 6.6]]) olive(ctx.world, x, G, z, 60 + x);
    for (let x = -22; x <= 24; x += 3.4) {
      if (x > BASIN[0] - 2 && x < BASIN[1] + 2) continue;
      if (Math.abs(x - D.lantern[0]) < 3 || Math.abs(x - D.awning[0]) < 2.5 || Math.abs(x - D.gardenlamp[0]) < 3) continue;
      g(x, G + 0.55, 8.7, 0.12, 1.1, 0.12, 0x3a2f27); lamp(x, G + 1.2, 8.7, 0.3, 0.32, 0.3, 0xe8dcb8, 0xffc468);
    }
    for (const x of [-16, 1.5]) { g(x, 0.5, COAST + 2.5, 1.6, 0.3, 5.5, 0x9a7a52); for (const dz of [0.4, 2.6, 4.8]) { g(x - 0.7, 0.2, COAST + dz, 0.16, 0.9, 0.16, 0x5a3f28); g(x + 0.7, 0.2, COAST + dz, 0.16, 0.9, 0.16, 0x5a3f28); } }

    // ---------- people, gulls, ships, water ----------
    const cols = [0xc0392b, 0x2e7bd6, 0xe0b030, 0x2e9b4a, 0xb565d9, 0xf5f0e6, 0xe8743a, 0x2ec4b6];
    for (const [x1, z1, x2, z2, y, i] of [[-24, 6.2, -6, 6.2, G, 0], [24, 7.4, 15, 7.4, G, 1], [-4, 7.8, -20, 7.8, G, 2], [-8, 4.4, -14, 4.4, G, 3], [20, 4.8, 24, 4.8, G, 4], [-20, 5.2, -10, 5.2, G, 5], [3.0, 6, 3.0, -9, G, 6], [15.2, -9, 15.2, 6, G, 7]]) {
      const p = person(ctx.world, x1, y, z1, cols[i]); U.people.push({ g: p, x1, z1, x2, z2, y, sp: 0.035 + 0.008 * i, ph: i * 1.3 });
    }
    for (let k = 0; k < 4; k++) {
      const d = motion(o(0, 0, 0)); ctx.world.add(d);
      g(0, 0, 0, 0.5, 0.2, 0.2, 0xf5f0e6, d); g(0.28, 0.06, 0, 0.18, 0.18, 0.16, 0xf5f0e6, d);
      const wings = [-1, 1].map((s) => { const p = motion(o(0, 0.08, s * 0.1)); d.add(p); g(0, 0.04, s * 0.32, 0.4, 0.05, 0.6, 0xe8e4da, p); return { p, s }; });
      U.gulls.push({ g: d, wings, r: 10 + k * 3, w: (k % 2 ? -1 : 1) * (0.15 + 0.03 * k), y: 22 + k * 1.8, ph: k * 1.7, cx: k % 2 ? Z[0] : CX, cz: k % 2 ? Z[1] : CZ });
    }
    // two ships sail through the harbour mouth, under the Colossus (they travel along z); two more ply the open bay
    for (const [x, ph, sail, stripe, sc] of [[8.0, 0.4, 0xf3ecd8, 0xc0392b, 0.85], [10.3, 3.1, 0xf3ecd8, 0x2e7bd6, 0.8]]) {
      const s = ship(ctx.world, sail, stripe); s.scale.set(sc, sc, sc); U.ships.push({ g: s, mode: 'z', x, A: 22, c: -2.5, w: 0.035, ph });
    }
    for (const [z, A, w, ph, sail, stripe, sc] of [[21.5, 20, 0.04, 0.5, 0xf3ecd8, 0xe0b030, 1], [18.8, 21, 0.031, 3.4, 0xf3ecd8, 0x2e9b4a, 0.85]]) {
      const s = ship(ctx.world, sail, stripe); s.scale.set(sc, sc, sc); U.ships.push({ g: s, mode: 'x', z, A, w, ph });
    }
    for (let i = 0; i < 100; i++) {
      const m = lamp(0, SEA + 0.13, 10.5 + hash(i, 2) * 13, 0.9 + hash(i, 9) * 1.1, 0.04, 0.14, 0xdff3ff, 0x6f8fc0, { alpha: 0.5 });
      U.ripples.push({ m, x0: hash(i, 1) * 52 - 26, sp: 0.25 + hash(i, 3) * 0.4, fl: 0.8 + hash(i, 5) * 1.4, ph: hash(i, 6) * 6.3, a: 0.55 });
    }
    for (let i = 0; i < 26; i++) {                                    // harbour ripples drift down the channel
      const m = lamp(5.8 + hash(i, 31) * 6.4, SEA + 0.13, 0, 0.9 + hash(i, 9) * 0.8, 0.04, 0.14, 0xdff3ff, 0x6f8fc0, { alpha: 0.5 });
      U.zrip.push({ m, sp: 0.3 + hash(i, 3) * 0.4, ph: hash(i, 6) * 6.3, fl: 0.9 + hash(i, 5) * 1.2, z0: hash(i, 7) * 22 });
    }
    for (let i = 0; i < 36; i++) U.glints.push({ m: lamp(hash(i, 21) * 48 - 24, SEA + 0.15, 10.5 + hash(i, 22) * 13, 0.22, 0.05, 0.22, 0xffffff, 0xffc878, { alpha: 0 }), ph: hash(i, 23) * 6.3, f: 1.2 + hash(i, 24) * 1.5, a: 0.9 });
    for (let i = 0; i < 14; i++) U.glints.push({ m: lamp(5.8 + hash(i, 41) * 6.4, SEA + 0.15, -13 + hash(i, 42) * 21, 0.22, 0.05, 0.22, 0xffffff, 0xffc878, { alpha: 0 }), ph: hash(i, 43) * 6.3, f: 1.2 + hash(i, 44) * 1.5, a: 0.9 });
    for (let i = 0; i < 52; i++) { const x = -25.5 + i; if (x > BASIN[0] - 0.5 && x < BASIN[1] + 0.5) continue; const m = lamp(x, SEA + 0.16, COAST + 0.6, 1.0, 0.06, 0.9, 0xffffff, 0x9cb4d8, { alpha: 0.6 }); U.foam.push({ m, x, ph: i * 0.45 }); }

    // ================= DIFFERENCES (every ~36 degrees around the scene) =================
    // 0: olive tree on the east bank — present or absent
    B(0, D.olive[0], G, D.olive[1], 'Olive tree beside the houses', 2.4, (d) => { if (!variant) { g(0, 0.7, 0, 0.35, 1.4, 0.35, 0x6b4a33, d); g(0, 1.9, 0, 2.0, 1.3, 2.0, 0x7f9a58, d); g(0.1, 2.8, 0, 1.3, 0.8, 1.3, 0x8aa45e, d); } }, variant);
    // 1: quay lanterns — warm white or cyan at night
    B(1, D.lantern[0], G, D.lantern[1], 'Quay lantern colour', 2.4, (d) => {
      for (const s of [-1, 1]) { g(s * 1.2, 0.8, 0, 0.14, 1.6, 0.14, 0x3a2f27, d); lamp(s * 1.2, 1.75, 0, 0.42, 0.44, 0.42, 0xe8dcb8, variant ? 0x4fd8ff : 0xffb23a, { parent: d, pickable: true }); }
    }, variant);
    // 2: ship at anchor in the bay
    B(2, D.ship[0], SEA, D.ship[1], 'Ship at anchor in the bay', 3.0, (d) => {
      g(2.2, 0.35, 0.9, 0.3, 0.7, 0.3, 0xc0392b, d);
      if (!variant) { const s = ship(d, 0xf3ecd8, 0x2e9b4a); s.rotation.y = 0.5; }
    }, variant);
    // 3: market awning — red or blue
    B(3, D.awning[0], G, D.awning[1], 'Market awning: red or blue', 2.8, (d) => {
      g(-1.1, 0.8, -0.8, 0.14, 1.6, 0.14, 0x6b4a33, d); g(1.1, 0.8, -0.8, 0.14, 1.6, 0.14, 0x6b4a33, d); g(-1.1, 0.8, 0.8, 0.14, 1.6, 0.14, 0x6b4a33, d); g(1.1, 0.8, 0.8, 0.14, 1.6, 0.14, 0x6b4a33, d);
      for (let k = 0; k < 5; k++) g(-1.1 + k * 0.55, 1.75, 0, 0.55, 0.12, 2.1, k & 1 ? 0xf5f0e6 : (variant ? 0x2e7bd6 : 0xc0392b), d);
      g(0, 0.5, 0, 1.6, 0.9, 0.9, 0xb98c58, d); for (let k = 0; k < 3; k++) g(-0.5 + k * 0.5, 1.05, 0.1, 0.3, 0.3, 0.3, [0xe8743a, 0xf2c83a, 0xc0392b][k], d);
    }, variant);
    // 4: garden lamps — amber or green at night
    B(4, D.gardenlamp[0], G, D.gardenlamp[1], 'Garden lamp colour', 2.4, (d) => {
      for (const k of [-1, 0, 1]) { g(k * 1.2, 0.7, 0, 0.12, 1.4, 0.12, 0x3a2f27, d); lamp(k * 1.2, 1.55, 0, 0.4, 0.4, 0.4, 0xe8dcb8, variant ? 0x6bff8a : 0xffb23a, { parent: d, pickable: true }); }
    }, variant);
    // 5: goats and shepherd — three or two goats
    B(5, D.goats[0], top(...D.goats), D.goats[1], 'Goats by the wall: three or two', 3.0, (d) => {
      g(0, 0.25, 0.8, 3.6, 0.5, 0.5, STONE, d); person(d, -1.5, 0.0, -0.4, 0x2e7bd6);
      for (const [x, z] of [[-0.3, 0.2], [0.7, -0.1], [1.6, 0.3]].slice(0, variant ? 2 : 3)) { g(x, 0.35, z, 0.7, 0.4, 0.35, 0xf5f0e6, d); g(x + 0.4, 0.55, z, 0.25, 0.3, 0.25, 0xf5f0e6, d); g(x + 0.45, 0.78, z, 0.08, 0.16, 0.08, 0x3a2f27, d); for (const dz of [-0.1, 0.1]) g(x - 0.2, 0.1, z + dz, 0.1, 0.2, 0.1, 0xd9d2c0, d); }
    }, variant);
    // 6: hillside beacon — red or blue at night
    B(6, D.beacon[0], top(...D.beacon), D.beacon[1], 'Hillside beacon colour', 2.6, (d) => {
      g(0, 0.5, 0, 0.9, 1.0, 0.9, 0x6e5230, d); g(0, 1.1, 0, 1.2, 0.2, 1.2, 0x3a2f27, d);
      U.flames.push(lamp(0, 1.5, 0, 0.7, 0.7, 0.7, 0xd9d6cc, variant ? 0x7fd0ff : 0xff4a2a, { parent: d, pickable: true }));
    }, variant);
    // 7: banner — red or blue
    B(7, D.banner[0], top(...D.banner), D.banner[1], 'Banner colour: red or blue', 2.4, (d) => {
      g(0, 1.8, 0, 0.14, 3.6, 0.14, 0x3a2f27, d); g(0.6, 3.1, 0, 1.2, 0.9, 0.06, variant ? 0x2e7bd6 : 0xc0392b, d); g(0.6, 3.1, 0.04, 0.5, 0.4, 0.04, GOLD, d); g(0, 0.2, 0, 1.0, 0.4, 1.0, STONE, d);
    }, variant);
    // 8: sacred flame bowl behind the harbour — amber or teal at night
    B(8, D.flame[0], top(...D.flame), D.flame[1], 'Sacred flame colour', 2.4, (d) => {
      g(0, 0.7, 0, 0.5, 1.4, 0.5, MARBLE2, d); g(0, 1.5, 0, 1.2, 0.3, 1.2, GOLD, d);
      U.flames.push(lamp(0, 2.0, 0, 0.8, 0.7, 0.8, 0xd9d6cc, variant ? 0x35e0c0 : 0xffa040, { parent: d, pickable: true }));
    }, variant);
    // 9: cypress grove — three trees or two
    B(9, D.cypress[0], top(...D.cypress), D.cypress[1], 'Cypress grove: three trees or two', 2.8, (d) => {
      for (const [x, z, h] of [[-1.2, 0.2, 3.8], [0, -0.6, 4.4], [1.3, 0.3, 3.5]].slice(0, variant ? 2 : 3)) cypress(d, x, 0, z, h);
    }, variant);

    for (const i of [1, 4, 6, 8]) { const diff = U.diffs[i]; diff.nightOnly = true; diff.hintPhase = 0.86; diff.g.userData.motion = true; }

    U.localLights = [];
    for (const [x, y, z, color, power] of [[Z[0], 8, Z[1] + 2, 0xffd9a0, 110], [CX, 24, CZ + 2, 0xffb060, 80], [16, 4, 4, 0xffc27a, 55], [-9, 4, 6.5, 0xffc27a, 55], [-23, 4, 7, 0xffc27a, 40]]) {
      const l = new PointLight(color, 0, 28, 1.5);
      l.position.set(x, y, z); l.userData.nightPower = power; ctx.world.add(l); U.localLights.push(l);
    }
  }

  // Daily story (300 s = one day): ships glide under the Colossus' legs, ripples drift down the channel, foam laps the quay, incense smoke
  // rises in the temple of Zeus, citizens walk the quay and gulls circle; at dusk the torch of Helios, the braziers and lamps glow.
  function animate(world, time, reduced = false) {
    const u = world.userData, t = reduced ? time * 0.4 : time;
    const phase = (((time / 300) % 1) + 1) % 1;
    const day = phase > 0.24 && phase < 0.8;
    const nightF = phase >= 0.5 ? smooth(0.74, 0.84, phase) : 1 - smooth(0.2, 0.27, phase);
    for (const r of u.ripples || []) {
      r.m.position.x = (((r.x0 + t * r.sp + 26) % 52) + 52) % 52 - 26;
      r.m.material.opacity = r.a * (0.2 + 0.8 * Math.pow(0.5 + 0.5 * Math.sin(t * r.fl + r.ph), 2)) * (1 - 0.5 * nightF);
    }
    for (const r of u.zrip || []) {
      r.m.position.z = -13 + (((r.z0 + t * r.sp) % 22) + 22) % 22;
      r.m.material.opacity = 0.5 * (0.2 + 0.8 * Math.pow(0.5 + 0.5 * Math.sin(t * r.fl + r.ph), 2)) * (1 - 0.5 * nightF);
    }
    for (const q of u.glints || []) { const s = Math.max(0, Math.sin(t * q.f + q.ph)); q.m.material.opacity = q.a * s * s * s * (day ? 1 : 0.35 + 0.65 * nightF); }
    for (const f of u.foam || []) {
      const k = 0.5 + 0.5 * Math.sin(t * 1.6 - f.ph);
      f.m.position.z = COAST + 0.5 + 0.35 * k; f.m.scale.set(1.0, 0.06, 0.5 + 0.7 * k); f.m.material.opacity = 0.15 + 0.5 * (1 - k);
    }
    for (const b of u.ships || []) {
      const a = t * b.w + b.ph, dirc = Math.cos(a), flip = -Math.PI * (1 - smooth(-0.12, 0.12, dirc));
      if (b.mode === 'z') { b.g.position.set(b.x + Math.sin(t * 0.5 + b.ph) * 0.2, SEA - 0.05 + Math.sin(t * 1.6 + b.ph) * 0.07, b.c + Math.sin(a) * b.A * 0.5); b.g.rotation.y = flip - Math.PI / 2; }
      else { b.g.position.set(Math.sin(a) * b.A, SEA - 0.05 + Math.sin(t * 1.6 + b.ph) * 0.07, b.z); b.g.rotation.y = flip; }
      b.g.rotation.z = Math.sin(t * 1.2 + b.ph) * 0.04; b.g.rotation.x = Math.sin(t * 0.9 + b.ph) * 0.03;
    }
    for (const p of u.people || []) {
      const a = t * p.sp + p.ph, f = 0.5 + 0.5 * Math.sin(a);
      p.g.position.set(p.x1 + (p.x2 - p.x1) * f, p.y + Math.abs(Math.sin(t * 4 + p.ph)) * 0.06, p.z1 + (p.z2 - p.z1) * f);
      p.g.rotation.y = Math.atan2((p.x2 - p.x1) * Math.cos(a), (p.z2 - p.z1) * Math.cos(a));
    }
    for (const b of u.gulls || []) {
      b.g.visible = day;
      const a = t * b.w + b.ph;
      b.g.position.set(b.cx + Math.cos(a) * b.r, b.y + Math.sin(t * 0.7 + b.ph) * 0.9, b.cz + Math.sin(a) * b.r);
      b.g.rotation.y = Math.atan2(-Math.sign(b.w) * Math.cos(a), -Math.sign(b.w) * Math.sin(a));
      for (const w of b.wings) w.p.rotation.x = w.s * Math.sin(t * 7 + b.ph) * 0.5;
    }
    for (const s of u.smoke || []) {
      const f = ((t * 0.12 + s.ph) % 1 + 1) % 1;
      s.m.position.set(s.ox + f * s.drift, s.oy + f * s.rise, s.oz + f * 0.8); s.m.scale.setScalar(0.4 + f * 1.3); s.m.material.opacity = (1 - f) * 0.35;
    }
    for (const f of u.flames || []) { const b = f.userData.sc || (f.userData.sc = [f.scale.x, f.scale.y, f.scale.z]); f.scale.set(b[0] * (1 + 0.08 * Math.sin(t * 9 + f.position.x)), b[1] * (1 + 0.18 * Math.sin(t * 7 + f.position.z)), b[2] * (1 + 0.08 * Math.sin(t * 8))); }
  }

  function updateLighting(world, phase, { glow = 0 } = {}) {
    const u = world.userData;
    for (const l of u.wallLights || []) l.m.material.color.set(l.day).lerp(new Color(l.night), glow);
    for (const l of u.localLights || []) l.intensity = glow * (l.userData.nightPower || 24);
    for (const st of u.statues || []) if (Math.abs(glow - st.glow) > 0.004) { const arr = st.attr.array; for (let i = 0; i < arr.length; i++) arr[i] = st.day[i] + (st.night[i] - st.day[i]) * glow; st.attr.needsUpdate = true; st.glow = glow; }
  }

  return { build, animate, height, water: () => false, updateLighting };
}
