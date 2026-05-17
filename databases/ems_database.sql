--
-- PostgreSQL database dump
--

\restrict eofV1XJuFLSJc9yrglMILQkJUQ0NlbLrMCGeybdhhsfO3M2Efdbap4cVbqsSehO

-- Dumped from database version 18.4 (Postgres.app)
-- Dumped by pg_dump version 18.3

-- Started on 2026-05-17 14:22:00 WIB

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
-- TOC entry 219 (class 1259 OID 16391)
-- Name: employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee (
    username character varying(50) NOT NULL,
    "firstName" character varying(100) NOT NULL,
    "lastName" character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    "birthDate" date NOT NULL,
    "basicSalary" numeric(12,2) NOT NULL,
    status character varying(50) NOT NULL,
    "group" character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    id integer NOT NULL,
    description timestamp without time zone,
    "uuidKey" character varying(100)
);


ALTER TABLE public.employee OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 17183)
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
-- Dependencies: 220
-- Name: employee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employee_id_seq OWNED BY public.employee.id;


--
-- TOC entry 3670 (class 2604 OID 17184)
-- Name: employee id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee ALTER COLUMN id SET DEFAULT nextval('public.employee_id_seq'::regclass);


--
-- TOC entry 3822 (class 0 OID 16391)
-- Dependencies: 219
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee (username, "firstName", "lastName", email, "birthDate", "basicSalary", status, "group", password, id, description, "uuidKey") FROM stdin;
budis	Budi	Santoso	budi.s@email.com	1995-11-10	5500000.00	Contract	Support	budi	1	\N	\N
janedoe	Jane	Smith	jane.smith@email.com	1992-08-20	8500000.00	Active	Marketing	smith	2	\N	\N
johndoe	John	Doe	john.doe@email.com	1990-05-15	7500000.00	Active	Engineering	doe	3	\N	\N
bayu	Bayu	Dev	bayu.dev@gmail.com	2007-02-16	5000000.00	Permanent	Engineering	bayu	4	2026-05-23 00:00:00	\N
jeje	Jeje	Frontend Engineer	jeje.fe@gmail.com	2008-02-16	6000000.00	Permanent	Engineering	jeje	5	2026-05-16 00:00:00	\N
user1	First1	Last1	user1@example.com	1990-01-02	5100000.00	Resigned	HR	password1	6	2026-05-17 01:13:52.542	\N
user2	First2	Last2	user2@example.com	1990-01-03	5200000.00	On Leave	Finance	password2	7	2026-05-17 01:13:52.563	\N
user3	First3	Last3	user3@example.com	1990-01-04	5300000.00	Active	Operations	password3	8	2026-05-17 01:13:52.568	\N
user4	First4	Last4	user4@example.com	1990-01-05	5400000.00	Resigned	Sales	password4	9	2026-05-17 01:13:52.578	\N
user5	First5	Last5	user5@example.com	1990-01-06	5500000.00	On Leave	IT	password5	10	2026-05-17 01:13:52.585	\N
user6	First6	Last6	user6@example.com	1990-01-07	5600000.00	Active	HR	password6	11	2026-05-17 01:13:52.589	\N
user7	First7	Last7	user7@example.com	1990-01-08	5700000.00	Resigned	Finance	password7	12	2026-05-17 01:13:52.592	\N
user8	First8	Last8	user8@example.com	1990-01-09	5800000.00	On Leave	Operations	password8	13	2026-05-17 01:13:52.594	\N
user9	First9	Last9	user9@example.com	1990-01-10	5900000.00	Active	Sales	password9	14	2026-05-17 01:13:52.598	\N
user10	First10	Last10	user10@example.com	1990-01-11	6000000.00	Resigned	IT	password10	15	2026-05-17 01:13:52.6	\N
user11	First11	Last11	user11@example.com	1990-01-12	6100000.00	On Leave	HR	password11	16	2026-05-17 01:13:52.602	\N
user12	First12	Last12	user12@example.com	1990-01-13	6200000.00	Active	Finance	password12	17	2026-05-17 01:13:52.605	\N
user13	First13	Last13	user13@example.com	1990-01-14	6300000.00	Resigned	Operations	password13	18	2026-05-17 01:13:52.609	\N
user14	First14	Last14	user14@example.com	1990-01-15	6400000.00	On Leave	Sales	password14	19	2026-05-17 01:13:52.611	\N
user15	First15	Last15	user15@example.com	1990-01-16	6500000.00	Active	IT	password15	20	2026-05-17 01:13:52.613	\N
user16	First16	Last16	user16@example.com	1990-01-17	6600000.00	Resigned	HR	password16	21	2026-05-17 01:13:52.614	\N
user17	First17	Last17	user17@example.com	1990-01-18	6700000.00	On Leave	Finance	password17	22	2026-05-17 01:13:52.616	\N
user18	First18	Last18	user18@example.com	1990-01-19	6800000.00	Active	Operations	password18	23	2026-05-17 01:13:52.618	\N
user19	First19	Last19	user19@example.com	1990-01-20	6900000.00	Resigned	Sales	password19	24	2026-05-17 01:13:52.619	\N
user20	First20	Last20	user20@example.com	1990-01-21	7000000.00	On Leave	IT	password20	25	2026-05-17 01:13:52.62	\N
user21	First21	Last21	user21@example.com	1990-01-22	7100000.00	Active	HR	password21	26	2026-05-17 01:13:52.621	\N
user22	First22	Last22	user22@example.com	1990-01-23	7200000.00	Resigned	Finance	password22	27	2026-05-17 01:13:52.622	\N
user23	First23	Last23	user23@example.com	1990-01-24	7300000.00	On Leave	Operations	password23	28	2026-05-17 01:13:52.624	\N
user24	First24	Last24	user24@example.com	1990-01-25	7400000.00	Active	Sales	password24	29	2026-05-17 01:13:52.625	\N
user25	First25	Last25	user25@example.com	1990-01-26	7500000.00	Resigned	IT	password25	30	2026-05-17 01:13:52.625	\N
user26	First26	Last26	user26@example.com	1990-01-27	7600000.00	On Leave	HR	password26	31	2026-05-17 01:13:52.626	\N
user27	First27	Last27	user27@example.com	1990-01-28	7700000.00	Active	Finance	password27	32	2026-05-17 01:13:52.627	\N
user28	First28	Last28	user28@example.com	1990-01-01	7800000.00	Resigned	Operations	password28	33	2026-05-17 01:13:52.628	\N
user29	First29	Last29	user29@example.com	1990-01-02	7900000.00	On Leave	Sales	password29	34	2026-05-17 01:13:52.629	\N
user30	First30	Last30	user30@example.com	1990-01-03	8000000.00	Active	IT	password30	35	2026-05-17 01:13:52.63	\N
user31	First31	Last31	user31@example.com	1990-01-04	8100000.00	Resigned	HR	password31	36	2026-05-17 01:13:52.632	\N
user32	First32	Last32	user32@example.com	1990-01-05	8200000.00	On Leave	Finance	password32	37	2026-05-17 01:13:52.634	\N
user33	First33	Last33	user33@example.com	1990-01-06	8300000.00	Active	Operations	password33	38	2026-05-17 01:13:52.637	\N
user34	First34	Last34	user34@example.com	1990-01-07	8400000.00	Resigned	Sales	password34	39	2026-05-17 01:13:52.638	\N
user35	First35	Last35	user35@example.com	1990-01-08	8500000.00	On Leave	IT	password35	40	2026-05-17 01:13:52.639	\N
user36	First36	Last36	user36@example.com	1990-01-09	8600000.00	Active	HR	password36	41	2026-05-17 01:13:52.641	\N
user37	First37	Last37	user37@example.com	1990-01-10	8700000.00	Resigned	Finance	password37	42	2026-05-17 01:13:52.642	\N
user38	First38	Last38	user38@example.com	1990-01-11	8800000.00	On Leave	Operations	password38	43	2026-05-17 01:13:52.645	\N
user39	First39	Last39	user39@example.com	1990-01-12	8900000.00	Active	Sales	password39	44	2026-05-17 01:13:52.646	\N
user40	First40	Last40	user40@example.com	1990-01-13	9000000.00	Resigned	IT	password40	45	2026-05-17 01:13:52.647	\N
user41	First41	Last41	user41@example.com	1990-01-14	9100000.00	On Leave	HR	password41	46	2026-05-17 01:13:52.648	\N
user42	First42	Last42	user42@example.com	1990-01-15	9200000.00	Active	Finance	password42	47	2026-05-17 01:13:52.648	\N
user43	First43	Last43	user43@example.com	1990-01-16	9300000.00	Resigned	Operations	password43	48	2026-05-17 01:13:52.649	\N
user44	First44	Last44	user44@example.com	1990-01-17	9400000.00	On Leave	Sales	password44	49	2026-05-17 01:13:52.65	\N
user45	First45	Last45	user45@example.com	1990-01-18	9500000.00	Active	IT	password45	50	2026-05-17 01:13:52.65	\N
user46	First46	Last46	user46@example.com	1990-01-19	9600000.00	Resigned	HR	password46	51	2026-05-17 01:13:52.651	\N
user47	First47	Last47	user47@example.com	1990-01-20	9700000.00	On Leave	Finance	password47	52	2026-05-17 01:13:52.652	\N
user48	First48	Last48	user48@example.com	1990-01-21	9800000.00	Active	Operations	password48	53	2026-05-17 01:13:52.653	\N
user49	First49	Last49	user49@example.com	1990-01-22	9900000.00	Resigned	Sales	password49	54	2026-05-17 01:13:52.654	\N
user50	First50	Last50	user50@example.com	1990-01-23	10000000.00	On Leave	IT	password50	55	2026-05-17 01:13:52.655	\N
user51	First51	Last51	user51@example.com	1990-01-24	10100000.00	Active	HR	password51	56	2026-05-17 01:13:52.655	\N
user52	First52	Last52	user52@example.com	1990-01-25	10200000.00	Resigned	Finance	password52	57	2026-05-17 01:13:52.656	\N
user53	First53	Last53	user53@example.com	1990-01-26	10300000.00	On Leave	Operations	password53	58	2026-05-17 01:13:52.656	\N
user54	First54	Last54	user54@example.com	1990-01-27	10400000.00	Active	Sales	password54	59	2026-05-17 01:13:52.657	\N
user55	First55	Last55	user55@example.com	1990-01-28	10500000.00	Resigned	IT	password55	60	2026-05-17 01:13:52.658	\N
user56	First56	Last56	user56@example.com	1990-01-01	10600000.00	On Leave	HR	password56	61	2026-05-17 01:13:52.659	\N
user57	First57	Last57	user57@example.com	1990-01-02	10700000.00	Active	Finance	password57	62	2026-05-17 01:13:52.66	\N
user58	First58	Last58	user58@example.com	1990-01-03	10800000.00	Resigned	Operations	password58	63	2026-05-17 01:13:52.661	\N
user59	First59	Last59	user59@example.com	1990-01-04	10900000.00	On Leave	Sales	password59	64	2026-05-17 01:13:52.661	\N
user60	First60	Last60	user60@example.com	1990-01-05	11000000.00	Active	IT	password60	65	2026-05-17 01:13:52.663	\N
user61	First61	Last61	user61@example.com	1990-01-06	11100000.00	Resigned	HR	password61	66	2026-05-17 01:13:52.664	\N
user62	First62	Last62	user62@example.com	1990-01-07	11200000.00	On Leave	Finance	password62	67	2026-05-17 01:13:52.665	\N
user63	First63	Last63	user63@example.com	1990-01-08	11300000.00	Active	Operations	password63	68	2026-05-17 01:13:52.666	\N
user64	First64	Last64	user64@example.com	1990-01-09	11400000.00	Resigned	Sales	password64	69	2026-05-17 01:13:52.667	\N
user65	First65	Last65	user65@example.com	1990-01-10	11500000.00	On Leave	IT	password65	70	2026-05-17 01:13:52.667	\N
user66	First66	Last66	user66@example.com	1990-01-11	11600000.00	Active	HR	password66	71	2026-05-17 01:13:52.668	\N
user67	First67	Last67	user67@example.com	1990-01-12	11700000.00	Resigned	Finance	password67	72	2026-05-17 01:13:52.669	\N
user68	First68	Last68	user68@example.com	1990-01-13	11800000.00	On Leave	Operations	password68	73	2026-05-17 01:13:52.67	\N
user69	First69	Last69	user69@example.com	1990-01-14	11900000.00	Active	Sales	password69	74	2026-05-17 01:13:52.671	\N
user70	First70	Last70	user70@example.com	1990-01-15	12000000.00	Resigned	IT	password70	75	2026-05-17 01:13:52.671	\N
user71	First71	Last71	user71@example.com	1990-01-16	12100000.00	On Leave	HR	password71	76	2026-05-17 01:13:52.672	\N
user72	First72	Last72	user72@example.com	1990-01-17	12200000.00	Active	Finance	password72	77	2026-05-17 01:13:52.673	\N
user73	First73	Last73	user73@example.com	1990-01-18	12300000.00	Resigned	Operations	password73	78	2026-05-17 01:13:52.673	\N
user74	First74	Last74	user74@example.com	1990-01-19	12400000.00	On Leave	Sales	password74	79	2026-05-17 01:13:52.674	\N
user75	First75	Last75	user75@example.com	1990-01-20	12500000.00	Active	IT	password75	80	2026-05-17 01:13:52.675	\N
user76	First76	Last76	user76@example.com	1990-01-21	12600000.00	Resigned	HR	password76	81	2026-05-17 01:13:52.676	\N
user77	First77	Last77	user77@example.com	1990-01-22	12700000.00	On Leave	Finance	password77	82	2026-05-17 01:13:52.676	\N
user78	First78	Last78	user78@example.com	1990-01-23	12800000.00	Active	Operations	password78	83	2026-05-17 01:13:52.678	\N
user79	First79	Last79	user79@example.com	1990-01-24	12900000.00	Resigned	Sales	password79	84	2026-05-17 01:13:52.679	\N
user80	First80	Last80	user80@example.com	1990-01-25	13000000.00	On Leave	IT	password80	85	2026-05-17 01:13:52.68	\N
user81	First81	Last81	user81@example.com	1990-01-26	13100000.00	Active	HR	password81	86	2026-05-17 01:13:52.681	\N
user82	First82	Last82	user82@example.com	1990-01-27	13200000.00	Resigned	Finance	password82	87	2026-05-17 01:13:52.682	\N
user83	First83	Last83	user83@example.com	1990-01-28	13300000.00	On Leave	Operations	password83	88	2026-05-17 01:13:52.683	\N
user84	First84	Last84	user84@example.com	1990-01-01	13400000.00	Active	Sales	password84	89	2026-05-17 01:13:52.684	\N
user85	First85	Last85	user85@example.com	1990-01-02	13500000.00	Resigned	IT	password85	90	2026-05-17 01:13:52.684	\N
user86	First86	Last86	user86@example.com	1990-01-03	13600000.00	On Leave	HR	password86	91	2026-05-17 01:13:52.685	\N
user87	First87	Last87	user87@example.com	1990-01-04	13700000.00	Active	Finance	password87	92	2026-05-17 01:13:52.686	\N
user88	First88	Last88	user88@example.com	1990-01-05	13800000.00	Resigned	Operations	password88	93	2026-05-17 01:13:52.687	\N
user89	First89	Last89	user89@example.com	1990-01-06	13900000.00	On Leave	Sales	password89	94	2026-05-17 01:13:52.687	\N
user90	First90	Last90	user90@example.com	1990-01-07	14000000.00	Active	IT	password90	95	2026-05-17 01:13:52.688	\N
user91	First91	Last91	user91@example.com	1990-01-08	14100000.00	Resigned	HR	password91	96	2026-05-17 01:13:52.689	\N
user92	First92	Last92	user92@example.com	1990-01-09	14200000.00	On Leave	Finance	password92	97	2026-05-17 01:13:52.689	\N
user93	First93	Last93	user93@example.com	1990-01-10	14300000.00	Active	Operations	password93	98	2026-05-17 01:13:52.69	\N
user94	First94	Last94	user94@example.com	1990-01-11	14400000.00	Resigned	Sales	password94	99	2026-05-17 01:13:52.691	\N
user95	First95	Last95	user95@example.com	1990-01-12	14500000.00	On Leave	IT	password95	100	2026-05-17 01:13:52.692	\N
user96	First96	Last96	user96@example.com	1990-01-13	14600000.00	Active	HR	password96	101	2026-05-17 01:13:52.692	\N
user97	First97	Last97	user97@example.com	1990-01-14	14700000.00	Resigned	Finance	password97	102	2026-05-17 01:13:52.693	\N
user98	First98	Last98	user98@example.com	1990-01-15	14800000.00	On Leave	Operations	password98	103	2026-05-17 01:13:52.694	\N
user99	First99	Last99	user99@example.com	1990-01-16	14900000.00	Active	Sales	password99	104	2026-05-17 01:13:52.695	\N
user100	First100	Last100	user100@example.com	1990-01-17	15000000.00	Resigned	IT	password100	105	2026-05-17 01:13:52.699	\N
sutomo	Sutomo	Yatomo	sutomo.engineering@gmail.com	1979-03-16	9000000.00	Permanent	Finance	sutomo	106	2026-01-08 00:00:00	\N
raul	Raul	Dev	raul.dev@gmail.com	2006-08-10	1000000.00	Permanent	Operations	raul	107	2026-05-15 00:00:00	\N
joko	Joko	Dev	joko.dev@gmail.com	2012-02-16	10000000.00	Permanent	Engineering	07d350418f699f63e452dd1046053cf1:16c358f515983b0a9580120e9528c0e7	108	2026-05-19 00:00:00	f818e918-df3d-49a0-98f4-2ab9fb03b766
Duma	Duma	Maya	duma.op@gmail.com	2009-06-01	1200000.00	Permanent	Operations	a76855b26664ad607afa31e9a5792ed3:bed10db29eedc817b331312b7dbbfc4f	109	2026-05-21 00:00:00	76bab0fa-913b-498f-8fac-b33755647e5d
kiwi	Kiwi	Meilani	kiwi.op@gmail.com	2008-06-19	120000000.00	Permanent	Operations	c229e88d1318a38b374b6a41cdf17894:80cdeabd057da577c6ead319eeb639ee	110	2026-05-17 00:00:00	79af4986-57ec-4319-b320-9a69ebee2766
karrie	Karrie	Dev	karrie.dev@gmail.com	2007-02-07	12000000.00	Permanent	Operations	cabd5e7b5d41ca88067a83d58d4d21d9:f6a69ca50b93d768968482d4e41e350b	111	2026-05-06 00:00:00	d532636b-f0a8-454c-8795-30d729aa4404
nana	Nana	Mulana	nana.op@gmail.com	2013-03-06	7000000.00	Permanent	Operations	8d3d2f2ae9623ee8c65029f9485ec92f:d6b18b3ec63a410dcb69a6e9d56a928a	112	2026-05-17 00:00:00	8a9b2ced-c26e-4c49-a513-b30433f91f84
QQ	Mohamad	Apriyadi	mr643062@gmail.com	2026-05-12	33333333.00	Contract	Human Resources	e621ec30844351b3a2099e77f20dcd9e:ae19de17e1d35f14b9a1ed32e2abf135	113	2026-04-28 00:00:00	09a6c26e-5e27-4040-b771-40a38ef62c3c
15200060	Mohamad	Apriyadi	mr643062@gmail.com	2026-05-17	5555555.00	Contract	Engineering	393105c8d271c79c422d07c244f5827e:ad3b67eb16081d5e15eb12b15c376927	114	2026-05-26 00:00:00	59ebf2f3-e05b-4ce8-901e-ad1f41e02e69
kaki	kaki	aki	kaki@gmail.com	2026-05-17	40000000.00	Permanent	Human Resources	2375e7ae8d2ad858f597d3f8f50b5dd7:d08f9ad29a0c7e2145e50780195ac7ba	121	2026-05-12 00:00:00	ecaba8d3-df94-40d4-8e63-3f2503875723
Ulfa	ulfa	laila	ulfa@gmail.com	2015-02-12	7000000.00	Permanent	Engineering	472dbd83ad4d7db3e351a18403e1552c:62aaf3f06d8c6743de217bfa9bf5618f	122	2026-05-06 00:00:00	435f8f10-95a8-4f3f-907e-9b860c02f9cf
mamat	mamat	mamatuy	mamat@gmail.com	2011-03-17	5000000.00	Active	Operations	8649dbcd6c4146494e97d70abd519cad:77dc3d0aa194127680f5ad080151ab94	123	2026-05-17 00:00:00	7e90e912-788c-4d5e-a1ee-33c681d26b8d
kiki	kiki	kiki	kiki@gmail.com	2001-04-28	10000000.00	Active	Operations	465fb274cf5a31874dab7ae711b62d72:2486aaf6e81a3ea8c3cf9f1bd45f20f5	124	2026-05-17 00:00:00	d93cab90-90b8-4cc1-8c86-f419b4913736
kuee	kue	kue	kue@gmail.com	2026-05-17	200000.00	Active	Engineering	a18fb6515ac3a2b760e43cf45a5cc037:33d1d308e67d2fda460c5a767433e994	125	2026-05-04 00:00:00	73a02bf5-c9b8-42f3-8225-d8f6d7b96198
\.


--
-- TOC entry 3830 (class 0 OID 0)
-- Dependencies: 220
-- Name: employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_id_seq', 125, true);


--
-- TOC entry 3672 (class 2606 OID 17196)
-- Name: employee PK_3c2bc72f03fd5abbbc5ac169498; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY (id);


--
-- TOC entry 3674 (class 2606 OID 17198)
-- Name: employee UQ_389fe2fe09430efb8eabc4e1b6e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "UQ_389fe2fe09430efb8eabc4e1b6e" UNIQUE (username);


-- Completed on 2026-05-17 14:22:00 WIB

--
-- PostgreSQL database dump complete
--

\unrestrict eofV1XJuFLSJc9yrglMILQkJUQ0NlbLrMCGeybdhhsfO3M2Efdbap4cVbqsSehO

