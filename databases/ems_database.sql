--
-- PostgreSQL database dump
--

\restrict tDmeh9TN4e2ueyvRdHL3oMkgEy654KtBGwXSrUqbNL8TxlFc7zfpreejZH4qq7A

-- Dumped from database version 18.4 (Postgres.app)
-- Dumped by pg_dump version 18.3

-- Started on 2026-05-17 18:19:27 WIB

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 17218)
-- Name: employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    "firstName" character varying(100) NOT NULL,
    "lastName" character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    "uuidKey" character varying(100),
    email character varying(150) NOT NULL,
    "birthDate" date NOT NULL,
    "basicSalary" numeric(12,2) NOT NULL,
    status character varying(50) NOT NULL,
    "group" character varying(50) NOT NULL,
    description timestamp without time zone
);


ALTER TABLE public.employee OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17217)
-- Name: employee_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employee_id_seq OWNER TO postgres;

--
-- TOC entry 3829 (class 0 OID 0)
-- Dependencies: 219
-- Name: employee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employee_id_seq OWNED BY public.employee.id;


--
-- TOC entry 3670 (class 2604 OID 17221)
-- Name: employee id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee ALTER COLUMN id SET DEFAULT nextval('public.employee_id_seq'::regclass);


--
-- TOC entry 3823 (class 0 OID 17218)
-- Dependencies: 220
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee (id, username, "firstName", "lastName", password, "uuidKey", email, "birthDate", "basicSalary", status, "group", description) FROM stdin;
1	user1	First1	Last1	3775b5411e79547654a558585ef7c48d:832e9ba5f73eff2df4f73d7bb9dad14c	02361b44-7867-41e9-80a4-b94ae20448af	user1@example.com	1990-01-02	5100000.00	Resigned	Human Resources	2026-05-17 17:44:55.61
2	user2	First2	Last2	c90d1554585f153bfb9c94ac41e9f85a:17bdbe586837e7c25c3e0351d6a54b0f	591c3132-f0fd-472a-bbcd-cbf313c4cc12	user2@example.com	1990-01-03	5200000.00	Active	Marketing	2026-05-17 17:44:55.623
3	user3	First3	Last3	f4a041c939b3bcf12c40bc1212caea30:21084cb137ef3776090ae2b2c9c9a36f	7a0dab75-d62c-4970-abba-d89186b97ece	user3@example.com	1990-01-04	5300000.00	Resigned	Sales	2026-05-17 17:44:55.627
4	user4	First4	Last4	8c17c5e5d293a022f8320e788655bc79:a2b0dd5c9b563d267484b91daffc8343	85c73ad4-edb6-40fb-bb1a-24065dc94d23	user4@example.com	1990-01-05	5400000.00	Active	Finance	2026-05-17 17:44:55.63
5	user5	First5	Last5	d7009bd91eb42d109e37d907f8e095cf:55848f922d50e9d3268a2366ea14f438	f25da598-ec87-43ac-8bb9-66be4e84db36	user5@example.com	1990-01-06	5500000.00	Resigned	Legal	2026-05-17 17:44:55.632
6	user6	First6	Last6	b8be931d8d9fc5955aad5ef651f06118:eca76392d3954b87b5f6c6b8b9e90b6f	66c52ad7-8565-419a-b05f-75e743de35e2	user6@example.com	1990-01-07	5600000.00	Active	Product	2026-05-17 17:44:55.636
7	user7	First7	Last7	40487ad4862878984050afd85861c0f9:48a380f30adc1919605873c3b5b0b2a8	e680520b-6616-4a88-94e9-aa81a160f084	user7@example.com	1990-01-08	5700000.00	Resigned	Design	2026-05-17 17:44:55.639
8	user8	First8	Last8	b3baa0f6752ad1ae92f1a59494128a10:9854b13ab5d438bef2f72b4d00fef8c9	0648f596-e141-47c9-b7b4-49de38d314de	user8@example.com	1990-01-09	5800000.00	Active	Customer Support	2026-05-17 17:44:55.642
9	user9	First9	Last9	f35a783b71526f9db1414b0669db3aa8:2af88b00119073122e5c78f66502596f	d12f3906-ef1b-4b46-8745-acf25ea773ed	user9@example.com	1990-01-10	5900000.00	Resigned	Operations	2026-05-17 17:44:55.644
10	user10	First10	Last10	0c354f5efd329cda76b99f7bda29ae98:3b4c9647dce35f5d84690186b595ee5b	584e737d-67ed-414f-901c-945d8227a37d	user10@example.com	1990-01-11	6000000.00	Active	Engineering	2026-05-17 17:44:55.648
11	user11	First11	Last11	316178445b8623c9837efb3cc3b85d40:fe9fc427e50587c9a330af01cb46de16	d44131f7-f307-4780-b778-d9ef5eaf1147	user11@example.com	1990-01-12	6100000.00	Resigned	Human Resources	2026-05-17 17:44:55.65
12	user12	First12	Last12	102dd76179f30c0dcd666e3717feabd2:7d7f8bdfeeca176094337077fc313bc5	6d378c3c-d900-421b-8a6b-45bd3f11b41f	user12@example.com	1990-01-13	6200000.00	Active	Marketing	2026-05-17 17:44:55.654
13	user13	First13	Last13	651ea2ba350db13e8c9d7f4cbd083323:4af706747f9e4f41be759180f53ad910	39810e1b-b29d-40f2-9729-08ad578ebff1	user13@example.com	1990-01-14	6300000.00	Resigned	Sales	2026-05-17 17:44:55.659
14	user14	First14	Last14	a40b6519e69f4e9e419eb5ed8fb73e73:9dc9bf148e281c3827265dcddfc8b399	6cfb026b-eebb-4d93-94e4-d488b9f8e046	user14@example.com	1990-01-15	6400000.00	Active	Finance	2026-05-17 17:44:55.662
15	user15	First15	Last15	0ccfcc98fbdeef8e9eaaa47f520f1054:82bd8772448296cf7bb4ea0d23d9a340	30edf3cc-437c-4e19-b2a4-efd7c5d0d57c	user15@example.com	1990-01-16	6500000.00	Resigned	Legal	2026-05-17 17:44:55.665
16	user16	First16	Last16	bac74217e8ecdf3131c3847c2203e0a3:8b31f3c2692951faa2549f072e5354b7	325b8cab-ee01-43d3-a2ca-5742e13c1d4b	user16@example.com	1990-01-17	6600000.00	Active	Product	2026-05-17 17:44:55.666
17	user17	First17	Last17	d915a574188b5d232ddbc559752993b2:62ba93bfcc9eb568135e7bc4d90d0eab	2b38610d-0a2b-4824-afd5-d140a6c16487	user17@example.com	1990-01-18	6700000.00	Resigned	Design	2026-05-17 17:44:55.668
18	user18	First18	Last18	ac40b70d87b861ce6c41b2cba82bb2c0:cee0e13785b62dd955e6e5377f12ca7d	cf43b056-a6df-48f4-bb8c-d412aba47bd1	user18@example.com	1990-01-19	6800000.00	Active	Customer Support	2026-05-17 17:44:55.671
19	user19	First19	Last19	9edfa3759a15a96a209f042135addb2a:d7e09aca7d7503d6da3818200c625d83	fda7f51f-3675-4010-8dd6-6f6a17d743ed	user19@example.com	1990-01-20	6900000.00	Resigned	Operations	2026-05-17 17:44:55.672
20	user20	First20	Last20	79c488bce4aa14fd1da4b5bbada4b8b3:30eb28a940d8c4f0561171d478f081e3	df8060ab-c1b5-4a56-819a-b0039d2b85eb	user20@example.com	1990-01-21	7000000.00	Active	Engineering	2026-05-17 17:44:55.674
21	user21	First21	Last21	04afeed66d4a711f4223d018cfbdc349:ee7092ce569a33bc0cb08a5342933056	159eddb4-581d-498b-9fc2-22a7c74a7a5f	user21@example.com	1990-01-22	7100000.00	Resigned	Human Resources	2026-05-17 17:44:55.676
22	user22	First22	Last22	eee1363e376e774cad425babe2b89cc8:21c7635325eb5af61a714607bdf9b831	93d89c52-222f-4b92-aed6-5034c7397808	user22@example.com	1990-01-23	7200000.00	Active	Marketing	2026-05-17 17:44:55.678
23	user23	First23	Last23	17d42f3033e48d4a12f1703fecf53862:5b7ae0de9cb894306d9b93796fb8e17c	b840863a-a19c-4286-ba8f-cbd58fa682b7	user23@example.com	1990-01-24	7300000.00	Resigned	Sales	2026-05-17 17:44:55.68
24	user24	First24	Last24	502ea7e392c335321c1cfce0e01c8c95:c60c5c39d8ef21b38225b2528a045320	c54477a0-c4d3-424b-9340-2c775ab0c4f1	user24@example.com	1990-01-25	7400000.00	Active	Finance	2026-05-17 17:44:55.681
25	user25	First25	Last25	8f18fa747cc159f5f574827c2c85914d:fd42846092210c667985f9aa350e1663	d7edbbf9-aacf-498a-99f8-d7006fcfa004	user25@example.com	1990-01-26	7500000.00	Resigned	Legal	2026-05-17 17:44:55.683
26	user26	First26	Last26	359447139d10ab4a0b1a886f02ba07fe:3b84242973a72456f9975f71ed8c4d15	0fa520e5-bc0e-4750-ac56-108a0495364a	user26@example.com	1990-01-27	7600000.00	Active	Product	2026-05-17 17:44:55.684
27	user27	First27	Last27	621a1d836b3d6633bb011d9a353c9c3d:e9a818af9ab0199e774bb3122ee7229a	84d675c5-b072-4d8f-b876-616f3a49aba0	user27@example.com	1990-01-28	7700000.00	Resigned	Design	2026-05-17 17:44:55.686
28	user28	First28	Last28	1c0fc9a073377b7a965f072c262ab258:0a0dde51b9ab6cbc6ab7e5ee83f7d6c2	007fc9e6-57e3-4e0d-b078-dd4924fd29ba	user28@example.com	1990-01-01	7800000.00	Active	Customer Support	2026-05-17 17:44:55.688
29	user29	First29	Last29	0c19090906818c950665a6b8318e9371:07643d311677af44fe9aaa91f14092a4	61d9b64a-0ed1-431f-bf57-b285dddf6d69	user29@example.com	1990-01-02	7900000.00	Resigned	Operations	2026-05-17 17:44:55.69
30	user30	First30	Last30	2fbeb502a309c872c815aa96c3216fa8:6f495debcf2c852170009f77119ce90d	329ba593-c3a5-4de4-90b0-4d1cc1491f42	user30@example.com	1990-01-03	8000000.00	Active	Engineering	2026-05-17 17:44:55.692
31	user31	First31	Last31	2a7e92ca1e9379cf09633ad0bd2c0ade:8f9778f59e8f445d61cbfc2c2ecd76ca	03b246c1-3b06-43cd-821a-a0789fbbb66d	user31@example.com	1990-01-04	8100000.00	Resigned	Human Resources	2026-05-17 17:44:55.694
32	user32	First32	Last32	d2002bb5e20a48248f78754fee1e5994:d4d0f748135e73232201189ccf2192b9	fb5e66fd-0756-46c8-a599-97a6537c06a8	user32@example.com	1990-01-05	8200000.00	Active	Marketing	2026-05-17 17:44:55.696
33	user33	First33	Last33	772679f1db43104130e435eda652bb27:a7cf69d3056dd59dea75ac453d1ad1e5	b1253118-7497-423d-9d8f-b7b70e31fb07	user33@example.com	1990-01-06	8300000.00	Resigned	Sales	2026-05-17 17:44:55.697
34	user34	First34	Last34	d718ddbc6493046ff0c53e25785689b2:7c3719c6e10cbf4f7edaed5b8d7517a3	fef2bb81-2a6b-48ca-a3ae-9786230433f1	user34@example.com	1990-01-07	8400000.00	Active	Finance	2026-05-17 17:44:55.699
35	user35	First35	Last35	ef202d1ba6ce9b713c05f33e140c1888:c9c4f8bb285d6e5a3e759c07d43a2c4b	ba4e6ebd-a8b2-4908-8ea4-9308ef482770	user35@example.com	1990-01-08	8500000.00	Resigned	Legal	2026-05-17 17:44:55.7
36	user36	First36	Last36	f914b6c3807830eba2681874778214ad:cd3b7068cbb1c01b2988219688e5a923	04bc953a-dde8-4cdc-97ba-5738afc0ee81	user36@example.com	1990-01-09	8600000.00	Active	Product	2026-05-17 17:44:55.703
37	user37	First37	Last37	7056b5921143f047a625f6fc12ad6376:ab674a041c90d2a771ba855ffb583dd9	692c6ccc-4346-40b8-9426-1af26492adc1	user37@example.com	1990-01-10	8700000.00	Resigned	Design	2026-05-17 17:44:55.705
38	user38	First38	Last38	8f91b486a36bc76dd7aefa968c9a3aec:8055a7278cc5b4f53cbf06da3abbd09a	c05cac0b-626c-4f3b-9b09-27971f9a3f9e	user38@example.com	1990-01-11	8800000.00	Active	Customer Support	2026-05-17 17:44:55.706
39	user39	First39	Last39	24fec604751b355eda84119f35b78808:bd96306bc6b143f788bc727e79012eff	eec5be3f-289c-4804-91f3-9eb5eb75078b	user39@example.com	1990-01-12	8900000.00	Resigned	Operations	2026-05-17 17:44:55.708
40	user40	First40	Last40	429545e674c40c77f5e7660421fc9439:38b36bd606029bf9c34cd11e318db4a7	2e0455d7-9fbe-4646-92ec-a65ab82b4b0f	user40@example.com	1990-01-13	9000000.00	Active	Engineering	2026-05-17 17:44:55.709
41	user41	First41	Last41	32a3817db34f99867a2f49fc6b156179:73640bd01359cfe46550b42d134f40c8	a9c189a4-eafd-4e34-a250-955ee6668a25	user41@example.com	1990-01-14	9100000.00	Resigned	Human Resources	2026-05-17 17:44:55.711
42	user42	First42	Last42	86ec26bff30ffafabacf381a87a5b736:c3dbd113fcbf77056051a4b3d4bb3382	b695ae64-09e0-4101-8e5d-32d397189a5c	user42@example.com	1990-01-15	9200000.00	Active	Marketing	2026-05-17 17:44:55.712
43	user43	First43	Last43	1d19f888e7f12ef5f53599c22f61c3fc:f1ef92890918e4dae777db9b63bb5b98	4acc5057-e5cf-40e5-9cf7-5cc7e65f2cef	user43@example.com	1990-01-16	9300000.00	Resigned	Sales	2026-05-17 17:44:55.714
44	user44	First44	Last44	92fc4e6e6dee29568ea2f2e0ddbce1aa:58e4407efab977266893dcf1fe71548a	a87eed89-4c6f-43a1-8b74-13592173a729	user44@example.com	1990-01-17	9400000.00	Active	Finance	2026-05-17 17:44:55.715
45	user45	First45	Last45	14a2c776eaa843d88b47d9292c38270f:356c2279f3c725d294377d04a6457a2c	d87f0084-f8a7-4d74-82ae-9b272c7ef0ec	user45@example.com	1990-01-18	9500000.00	Resigned	Legal	2026-05-17 17:44:55.717
46	user46	First46	Last46	7e237686d3e4a03b8e0476374a062627:9c4d72df3568ddd34ea2efdf09e31188	f47db4a2-2266-49ec-8a70-45215b299dbd	user46@example.com	1990-01-19	9600000.00	Active	Product	2026-05-17 17:44:55.719
47	user47	First47	Last47	f78c129a711d3d1ff88e40e389a3f199:4903224d8e24c6be79c3e763357b16bd	bcef7af2-3ccf-4608-910d-14e340e6c218	user47@example.com	1990-01-20	9700000.00	Resigned	Design	2026-05-17 17:44:55.72
48	user48	First48	Last48	b0b695cd6898330b40fb603ac4f820e1:9fd73fdd7b625af5916e1c32908a8965	a0f727ae-e892-40a6-b9c7-53c3da84ea0f	user48@example.com	1990-01-21	9800000.00	Active	Customer Support	2026-05-17 17:44:55.722
49	user49	First49	Last49	811e24f942c67b4074efd5b807438cc6:780270c3f0b71451b764c1e25a0d0fd9	2973c674-085e-4342-8709-0f8fd15e8135	user49@example.com	1990-01-22	9900000.00	Resigned	Operations	2026-05-17 17:44:55.723
50	user50	First50	Last50	3d184961ea24df1b47250c21a8f25df7:c30caf42ff030ec9b45bf7e7c5925260	ce12b7e0-e8c8-4a2d-925a-1b27873e7311	user50@example.com	1990-01-23	10000000.00	Active	Engineering	2026-05-17 17:44:55.725
51	user51	First51	Last51	59f671157c7ee7e4320d781171e044fd:c22fa820dca8c022c541074073bafe87	2f6d5793-e94f-4526-9671-c8ff6464148d	user51@example.com	1990-01-24	10100000.00	Resigned	Human Resources	2026-05-17 17:44:55.726
52	user52	First52	Last52	e282656ae32048f98c8176a8eecf30f7:b1793f71650bb7f0f8bcab22ec0e3f1d	53ab81a7-805d-42cd-86a4-0c98256054e6	user52@example.com	1990-01-25	10200000.00	Active	Marketing	2026-05-17 17:44:55.727
53	user53	First53	Last53	f19db0adc63e39a675fde64c00c42bdf:dbf8ef34508d634217cbea4141d64b96	7d685357-69a5-4af2-ae3c-7112bd7a60f9	user53@example.com	1990-01-26	10300000.00	Resigned	Sales	2026-05-17 17:44:55.729
54	user54	First54	Last54	b3de6cc4e5f17e78b654b90daa5cdbe0:645d8970d216a84d157f1e40dc793ea9	d1c6c2f7-62cf-4fd2-a6a3-c1ba02ed8a85	user54@example.com	1990-01-27	10400000.00	Active	Finance	2026-05-17 17:44:55.73
55	user55	First55	Last55	b721e41d610b1342c576222d84a07884:b0a140ef7ed8377a0f1b94f92910cbcf	a680d8cd-4c14-4d5b-aa49-2660ebd1b752	user55@example.com	1990-01-28	10500000.00	Resigned	Legal	2026-05-17 17:44:55.731
56	user56	First56	Last56	40b791e9e9f50d02a1bf990960d4eef9:7f421e2846030982c17fd8a3bd29f84f	8bab1d06-9bdd-4abf-af85-705ccea2e2ec	user56@example.com	1990-01-01	10600000.00	Active	Product	2026-05-17 17:44:55.735
57	user57	First57	Last57	ec0ee578d5a415e6040deb0dd2d9d1ec:59762000fe67643c8b88674c04280dad	038b5b28-8f80-4359-8553-04e76ff40c9e	user57@example.com	1990-01-02	10700000.00	Resigned	Design	2026-05-17 17:44:55.736
58	user58	First58	Last58	a466b0cbb7d129d1a54e83e398c951fd:bb8d688627f0dc2ae251a78c2bd0d39b	a94e5fd2-da53-411d-8446-e540a04163a7	user58@example.com	1990-01-03	10800000.00	Active	Customer Support	2026-05-17 17:44:55.738
59	user59	First59	Last59	b86382042d70d5069f49f07f4c542a85:baf05fa92dabb1305fef64086d403173	d3be9675-6b4c-48f5-8f80-769726a26d5e	user59@example.com	1990-01-04	10900000.00	Resigned	Operations	2026-05-17 17:44:55.739
60	user60	First60	Last60	ca5f81f7f39069c07f80f409a7ecb81f:554b372ae533f50d935ab16e717f16a8	49d3b05c-2b42-4ff4-843c-bb22e65830b8	user60@example.com	1990-01-05	11000000.00	Active	Engineering	2026-05-17 17:44:55.74
61	user61	First61	Last61	7fb0ed5b13e9594456512a484e175d8e:e35adc709622148f21704d6e824818ef	d7f12c3b-3cd1-4cb4-ae3b-b7a0e0e58386	user61@example.com	1990-01-06	11100000.00	Resigned	Human Resources	2026-05-17 17:44:55.742
62	user62	First62	Last62	4404a6deec45e03268e822309d203d4b:56971500c294c8f8d66a546016bff6f5	90191c16-afe0-4f9a-aec4-d9ec006131ba	user62@example.com	1990-01-07	11200000.00	Active	Marketing	2026-05-17 17:44:55.743
63	user63	First63	Last63	c2360521b60c7eed441fe5a3eafd81ec:9f9bc242164499f73ecd3a2622f11e19	9487ceaa-3509-460a-b1f2-ac24b7337dea	user63@example.com	1990-01-08	11300000.00	Resigned	Sales	2026-05-17 17:44:55.744
64	user64	First64	Last64	c9e18927ca526fa3ed666c1308db6d7e:4b24e36a4068b14bddf3e0f1c1a50926	de3238e8-0a28-48d2-b503-1e9bdd2b6b06	user64@example.com	1990-01-09	11400000.00	Active	Finance	2026-05-17 17:44:55.746
65	user65	First65	Last65	a44b06e17b5925f9451ec68ec6134de7:587de919c83b72622761ed2fc1fbe171	e3251f40-cd61-4009-8551-08f86904e8f3	user65@example.com	1990-01-10	11500000.00	Resigned	Legal	2026-05-17 17:44:55.748
66	user66	First66	Last66	7fd86081b3da09135ee7ede225732b4d:fa8a94ae6e9745dcacb5f0135dfff34d	f4063999-ef15-4d6f-ab91-7672a9d49be2	user66@example.com	1990-01-11	11600000.00	Active	Product	2026-05-17 17:44:55.749
67	user67	First67	Last67	57c34d8f6b687ae279798960855f3212:d69600aba4bdaaa8d4c12752858f6ebc	ecf9543e-6c47-4354-990f-ccfe654cc2d2	user67@example.com	1990-01-12	11700000.00	Resigned	Design	2026-05-17 17:44:55.75
68	user68	First68	Last68	bf7eec1af486a3c5ee2410950fbd58b0:662a8e39057865133300c455f07cecd1	72c12f19-1efa-4eaa-9fab-222e3316c1f8	user68@example.com	1990-01-13	11800000.00	Active	Customer Support	2026-05-17 17:44:55.752
69	user69	First69	Last69	0397594ab640be50854d1185ec778c9f:0a9392798e6b37c112d145ccd3126fa8	a61e6d8c-1a70-4e4f-a73a-c9e9e1d239fc	user69@example.com	1990-01-14	11900000.00	Resigned	Operations	2026-05-17 17:44:55.753
70	user70	First70	Last70	a250823086e195fa9fac164577340425:26524dc7d1b53212314569d9fa8267b2	3871aa5b-89e0-4fcd-88ab-6eeb0656a508	user70@example.com	1990-01-15	12000000.00	Active	Engineering	2026-05-17 17:44:55.755
71	user71	First71	Last71	0526fd683e7f26f92ef128665cf2ebf7:52f1f102ba78b3bac3c35a17f3858470	0be46694-b50e-4c5d-8bcf-482b14e89874	user71@example.com	1990-01-16	12100000.00	Resigned	Human Resources	2026-05-17 17:44:55.756
72	user72	First72	Last72	50d5c6fd453c0fadcb5bc4e5e8914ad5:b34fb47a7710e6cae9ae1c67cb790243	31b52d34-f61b-485c-97db-4a32687ca2a3	user72@example.com	1990-01-17	12200000.00	Active	Marketing	2026-05-17 17:44:55.757
73	user73	First73	Last73	b1626fc1f080fd3ea450fce3b6b1a78d:f0cfb89de1b6dbfb8f5f66d03b04ba6e	85a99d25-0742-43f5-8b28-7a51de6aeeac	user73@example.com	1990-01-18	12300000.00	Resigned	Sales	2026-05-17 17:44:55.759
74	user74	First74	Last74	c55c5c604a437bf3f7993bebf2531622:684938c10b9e3a129d00f326d353e482	d061a2ef-042d-498b-bf44-8c077758cd58	user74@example.com	1990-01-19	12400000.00	Active	Finance	2026-05-17 17:44:55.76
75	user75	First75	Last75	33970edf1cdf208623f743536cf7a83e:bb325a05984c6999ce0993fd051bd621	21b3c0c9-c1d8-40f4-9bc4-9116859e3eed	user75@example.com	1990-01-20	12500000.00	Resigned	Legal	2026-05-17 17:44:55.762
76	user76	First76	Last76	11a367176c9878cdfaac83038ea2e54b:85abccf00a3febbcff68b22ff0eb259f	24199014-f56b-475a-a86d-c5cb6bb78db4	user76@example.com	1990-01-21	12600000.00	Active	Product	2026-05-17 17:44:55.763
77	user77	First77	Last77	9329ad2e2a28ac1abc16a2953ad35732:7bfe6b853f6b578c1e8f1b5863a71d89	489b46c2-8c51-46a2-aaf7-242c9ff85398	user77@example.com	1990-01-22	12700000.00	Resigned	Design	2026-05-17 17:44:55.765
78	user78	First78	Last78	62ae0e32e5522430e781736f16a17d7b:7b5f074c3a068767eb010f05e7740568	b9e814ef-5c43-4d97-9ad4-ff14dba0f8dd	user78@example.com	1990-01-23	12800000.00	Active	Customer Support	2026-05-17 17:44:55.766
79	user79	First79	Last79	48d3daa248e41d5b8a737cd134969d1f:c8157d6b349719bbfb8778e29edc3399	21ba58a8-89a2-4b3e-8a30-dc46fcc46bd9	user79@example.com	1990-01-24	12900000.00	Resigned	Operations	2026-05-17 17:44:55.769
80	user80	First80	Last80	8afea75a66b52142802dcd1409c0ce59:4b406e1d2cf0f46000e9a3d7f64ea89b	0577f060-6bd4-4b6e-aaa3-84bf2d9bf35b	user80@example.com	1990-01-25	13000000.00	Active	Engineering	2026-05-17 17:44:55.771
81	user81	First81	Last81	72a2716c3db6f3983f375c9f05993c3f:162ba21ac092bc6bbf2bb22cdb3bd7b6	40ea7826-5fcb-483a-b547-b26025970bc2	user81@example.com	1990-01-26	13100000.00	Resigned	Human Resources	2026-05-17 17:44:55.772
82	user82	First82	Last82	ed2bfd5cb4210f4519873e984ffa3626:0816c0c2be44eeb51d24117dc4f869ee	6cd98a71-5f95-4e1c-8e96-2a3be9e7e205	user82@example.com	1990-01-27	13200000.00	Active	Marketing	2026-05-17 17:44:55.774
83	user83	First83	Last83	a7f59b632695e58227c1de7934e0dc92:37d44aed37586c5327a258ca04a77eca	ce26c550-3c3d-479d-9eed-759b138e052e	user83@example.com	1990-01-28	13300000.00	Resigned	Sales	2026-05-17 17:44:55.775
84	user84	First84	Last84	24f87114dbcc1ea7f3fc7e508e89204f:fb52c6025a694e44a285961675b99e8e	6cfa371f-2117-4d1d-96e0-d4cae7ce5d49	user84@example.com	1990-01-01	13400000.00	Active	Finance	2026-05-17 17:44:55.776
85	user85	First85	Last85	cd54955f74c069552c6439386f66c7b9:195c46b085285da52a0a6d416c7e373f	701847a0-a12c-491e-a82d-fb042852149e	user85@example.com	1990-01-02	13500000.00	Resigned	Legal	2026-05-17 17:44:55.778
86	user86	First86	Last86	21453412e680ad8a4b5d67c7ca5d62b2:001ff1b407d06895cc49b53a51ad9870	4b05fee4-1361-423b-8e02-6ee8966dfbbf	user86@example.com	1990-01-03	13600000.00	Active	Product	2026-05-17 17:44:55.779
87	user87	First87	Last87	0579e4b19d9e5901bcccde47b28ded76:e4ab335c1b6cae85701a4cc5bb3b85c1	423a50b5-30f0-490b-9400-2a68d84395a6	user87@example.com	1990-01-04	13700000.00	Resigned	Design	2026-05-17 17:44:55.781
88	user88	First88	Last88	d329e446c36b60e87d6fd143ae10cc2a:148a90e50133a3daf48452ffb082ad7f	9d990e12-bb54-4446-9ff6-cc82224e5b6b	user88@example.com	1990-01-05	13800000.00	Active	Customer Support	2026-05-17 17:44:55.782
89	user89	First89	Last89	491b3a3d3c13a45789d3696a73ae4d7a:779343e00206d11a2e9f3d5189b1855f	2b6f75e9-31dc-4ca1-a61c-2463dba6ae70	user89@example.com	1990-01-06	13900000.00	Resigned	Operations	2026-05-17 17:44:55.784
90	user90	First90	Last90	8a5fef94f56a30a4bca34f8c588658e5:a8574dc43e4be76d881fe77ae5611e5f	2434810b-cc87-4f31-8ec0-e44df95c483f	user90@example.com	1990-01-07	14000000.00	Active	Engineering	2026-05-17 17:44:55.785
91	user91	First91	Last91	90a9d55cfdff131b2a4252c566258500:3047833b945b2273318c0ca5814736d4	23251b4f-b9f0-4597-9a71-584492bdfe39	user91@example.com	1990-01-08	14100000.00	Resigned	Human Resources	2026-05-17 17:44:55.787
92	user92	First92	Last92	66279fc1e75c60e6f740aa25322d4a30:d38cba92245c4c42cc4f255ef4ff1a61	395119b2-a328-402c-8a59-8f18a681daa8	user92@example.com	1990-01-09	14200000.00	Active	Marketing	2026-05-17 17:44:55.789
93	user93	First93	Last93	b8a4af93f97eb7235803143567b6871c:80a0a82219775bd9e54b0082f071ba02	bd9973ea-2504-4bdf-9930-9e079532d781	user93@example.com	1990-01-10	14300000.00	Resigned	Sales	2026-05-17 17:44:55.791
94	user94	First94	Last94	653a6998a33a38fcb3d4899775d1b6d4:aa11e251d485ca8a6e62c6829b0d21b2	ef596986-3317-4502-8c50-228a965240c7	user94@example.com	1990-01-11	14400000.00	Active	Finance	2026-05-17 17:44:55.792
95	user95	First95	Last95	10882ec6bf84f37eaea39d2315141e05:bc0a5d691a8e585fbcae26804b827cfb	9c652f34-3e90-4469-8a5f-ba8b8d27bb9c	user95@example.com	1990-01-12	14500000.00	Resigned	Legal	2026-05-17 17:44:55.794
96	user96	First96	Last96	89deda0054864cd779d3f6e89c5ddf64:9d011e480e9a3af332e63bf2486c4e0d	6f8af8b2-d739-4991-9c33-a4253a445c46	user96@example.com	1990-01-13	14600000.00	Active	Product	2026-05-17 17:44:55.795
97	user97	First97	Last97	806e859ad329c5a2be66f51ab1d6c5b3:278bb1dea02c5f6ecefda55435f935d3	fa51de4e-fd7d-4d3c-b2e3-ed3f3ab3ec72	user97@example.com	1990-01-14	14700000.00	Resigned	Design	2026-05-17 17:44:55.797
98	user98	First98	Last98	10e7a9f2b13c16c2fb84a28b37c58864:742c11aa62a52d74c53fb75485c78d7a	2ef88684-98d9-42ea-89e2-f80c7f16aa7a	user98@example.com	1990-01-15	14800000.00	Active	Customer Support	2026-05-17 17:44:55.798
99	user99	First99	Last99	18d5a0d4e39d407c591db11dc02e6dae:4c66b720236a2b83c1c0ab8b2c668b49	eade7ebb-dab9-439f-8e4f-3d7530a6364b	user99@example.com	1990-01-16	14900000.00	Resigned	Operations	2026-05-17 17:44:55.799
100	user100	First100	Last100	6db03298818fe7b65f622015e3cc4ef7:c320a4681519192f1fddbfcfddd60c25	578791bc-004a-4c04-9357-ab098bab69d6	user100@example.com	1990-01-17	15000000.00	Active	Engineering	2026-05-17 17:44:55.801
\.


--
-- TOC entry 3830 (class 0 OID 0)
-- Dependencies: 219
-- Name: employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_id_seq', 100, true);


--
-- TOC entry 3672 (class 2606 OID 17235)
-- Name: employee PK_3c2bc72f03fd5abbbc5ac169498; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY (id);


--
-- TOC entry 3674 (class 2606 OID 17237)
-- Name: employee UQ_389fe2fe09430efb8eabc4e1b6e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "UQ_389fe2fe09430efb8eabc4e1b6e" UNIQUE (username);


-- Completed on 2026-05-17 18:19:28 WIB

--
-- PostgreSQL database dump complete
--

\unrestrict tDmeh9TN4e2ueyvRdHL3oMkgEy654KtBGwXSrUqbNL8TxlFc7zfpreejZH4qq7A

