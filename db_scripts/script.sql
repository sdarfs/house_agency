--
-- PostgreSQL database dump
--

--
-- Name: AddDocType(character varying); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public."AddDocType"(IN "InFileName" character varying)
    LANGUAGE plpgsql
AS $$begin
    insert into "DocumentType" ("updateStamp", "fileName")
    values (LOCALTIMESTAMP, "InFileName");
end;$$;


ALTER PROCEDURE public."AddDocType"(IN "InFileName" character varying) OWNER TO postgres;

--
-- Name: AddRequest(character varying, text, integer, integer, integer, integer, integer); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public."AddRequest"(IN "InNumber" character varying, IN "InDetails" text, IN "InHouseId" integer, IN "InRequestStateId" integer, IN "InClientId" integer, IN "InRequestTypeId" integer, IN "InDepartmentId" integer)
    LANGUAGE plpgsql
AS $$begin
    insert into "Request"(
        "number",
        "createStamp",
        "details",
        "HouseId",
        "RequestStateId",
        "ClientId",
        "RequestTypeId",
        "DepartmentId"
    )
    values(
              "InNumber",
              LOCALTIMESTAMP,
              "InDetails",
              "InHouseId",
              "InRequestStateId",
              "InClientId",
              "InRequestTypeId",
              "InDepartmentId"
          );
end;$$;


ALTER PROCEDURE public."AddRequest"(IN "InNumber" character varying, IN "InDetails" text, IN "InHouseId" integer, IN "InRequestStateId" integer, IN "InClientId" integer, IN "InRequestTypeId" integer, IN "InDepartmentId" integer) OWNER TO postgres;

--
-- Name: countClientAvgCost(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public."countClientAvgCost"("InClientId" integer) RETURNS bigint
    LANGUAGE plpgsql
AS $$declare
    cCost bigint;
begin
    select avg("House"."cost") into cCost
    from "House"
             join "Request" on "House"."id" = "Request"."HouseId"
             join "Client" on "Client"."id" = "Request"."ClientId"
    where "Client"."id" = "InClientId";

    return cCost;
end;$$;


ALTER FUNCTION public."countClientAvgCost"("InClientId" integer) OWNER TO postgres;

--
-- Name: countClientHousesCost(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public."countClientHousesCost"("InClientId" integer) RETURNS bigint
    LANGUAGE plpgsql
AS $$declare
    cCost bigint;
begin
    select sum("House"."cost") into cCost
    from "House"
             join "Request" on "House"."id" = "Request"."HouseId"
             join "Client" on "Client"."id" = "Request"."ClientId"
    where "Client"."id" = "InClientId";

    return cCost;
end;$$;


ALTER FUNCTION public."countClientHousesCost"("InClientId" integer) OWNER TO postgres;

--
-- Name: docTypeUpdate(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public."docTypeUpdate"() RETURNS trigger
    LANGUAGE plpgsql
AS $$begin
    update "DocumentType"
    set "updateStamp" = LOCALTIMESTAMP
    where new."id" = "id";
    return new;
end;$$;


ALTER FUNCTION public."docTypeUpdate"() OWNER TO postgres;

--
-- Name: passportArchive(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public."passportArchive"() RETURNS trigger
    LANGUAGE plpgsql
AS $$
begin
    update "Passport"
    set "isArchive" = true
    where
        ("WorkerId" is null and new."ClientId" = "ClientId")
       or
        ("ClientId" is null and new."WorkerId" = "WorkerId");

    return new;
end;
$$;


ALTER FUNCTION public."passportArchive"() OWNER TO postgres;

--
-- Name: requestUpdate(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public."requestUpdate"() RETURNS trigger
    LANGUAGE plpgsql
AS $$begin
    update "Request"
    set "statusUpdateStamp" = LOCALTIMESTAMP
    where new."id" = "id";
    return new;
end;$$;


ALTER FUNCTION public."requestUpdate"() OWNER TO postgres;

--
-- Name: upsert_passport(integer, text, text, text, date, date); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.upsert_passport(IN p_clientid integer, IN p_series text, IN p_number text, IN p_issuedby text, IN p_issueddate date, IN p_birthday date)
    LANGUAGE plpgsql
AS $$
DECLARE
    v_is_archive BOOLEAN;
BEGIN
    -- Проверяем значение is_Archive для записи с указанным ClientId
    SELECT "isArchive" INTO v_is_archive
    FROM "Passport"
    WHERE "ClientId" = p_ClientId;

    IF v_is_archive IS NULL THEN
        -- Если is_Archive пустое, выполняем INSERT
        INSERT INTO "Passport" ("ClientId", "series", "number", "issuedBy", "issuedDate", "birthday")
        VALUES (p_ClientId, p_series, p_number, p_issuedBy, p_issuedDate, p_birthday);
    ELSIF v_is_archive = TRUE THEN
        -- Если is_Archive TRUE, выполняем UPDATE
        UPDATE "Passport"
        SET
            "series" = p_series,
            "number" = p_number,
            "issuedBy" = p_issuedBy,
            "issuedDate" = p_issuedDate,
            "birthday" = p_birthday
        WHERE "ClientId" = p_ClientId;
    END IF;
END $$;


ALTER PROCEDURE public.upsert_passport(IN p_clientid integer, IN p_series text, IN p_number text, IN p_issuedby text, IN p_issueddate date, IN p_birthday date) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: City; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."City" (
                               id integer NOT NULL,
                               name character varying(255) NOT NULL
)
    WITH (autovacuum_enabled='true');


ALTER TABLE public."City" OWNER TO postgres;

--
-- Name: City_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."City_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."City_id_seq" OWNER TO postgres;

--
-- Name: City_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."City_id_seq" OWNED BY public."City".id;


--
-- Name: Client; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Client" (
                                 id integer NOT NULL,
                                 surname character varying(128) NOT NULL,
                                 name character varying(128) NOT NULL,
                                 "secondName" character varying(128),
                                 "phoneNumber" character varying(16),
                                 email character varying(64),
                                 password character varying(64),
                                 registration date
)
    WITH (autovacuum_enabled='true');


ALTER TABLE public."Client" OWNER TO postgres;

--
-- Name: Client_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Client_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Client_id_seq" OWNER TO postgres;

--
-- Name: Client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Client_id_seq" OWNED BY public."Client".id;


--
-- Name: Department; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Department" (
                                     id integer NOT NULL,
                                     name character varying(255) NOT NULL
)
    WITH (autovacuum_enabled='true');


ALTER TABLE public."Department" OWNER TO postgres;

--
-- Name: Department_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Department_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Department_id_seq" OWNER TO postgres;

--
-- Name: Department_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Department_id_seq" OWNED BY public."Department".id;


--
-- Name: District; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."District" (
                                   id integer NOT NULL,
                                   "Name" character varying(255) NOT NULL,
                                   "CityId" integer
)
    WITH (autovacuum_enabled='true');


ALTER TABLE public."District" OWNER TO postgres;

--
-- Name: District_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."District_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."District_id_seq" OWNER TO postgres;

--
-- Name: District_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."District_id_seq" OWNED BY public."District".id;


--
-- Name: Document; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Document" (
                                   id integer NOT NULL,
                                   "docNumber" character varying(255) NOT NULL,
                                   "createStamp" timestamp without time zone NOT NULL,
                                   "finishStamp" timestamp without time zone,
                                   "RequestId" integer,
                                   "DocumentTypeId" integer,
                                   doc_text text
)
    WITH (autovacuum_enabled='true');


ALTER TABLE public."Document" OWNER TO postgres;

--
-- Name: DocumentType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DocumentType" (
                                       id integer NOT NULL,
                                       "updateStamp" timestamp without time zone NOT NULL,
                                       "fileName" character varying(255) NOT NULL
)
    WITH (autovacuum_enabled='true');


ALTER TABLE public."DocumentType" OWNER TO postgres;

--
-- Name: DocumentType_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."DocumentType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."DocumentType_id_seq" OWNER TO postgres;

--
-- Name: DocumentType_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."DocumentType_id_seq" OWNED BY public."DocumentType".id;


--
-- Name: Document_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Document_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Document_id_seq" OWNER TO postgres;

--
-- Name: Document_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Document_id_seq" OWNED BY public."Document".id;


--
-- Name: House; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."House" (
                                id integer NOT NULL,
                                address character varying(255) NOT NULL,
                                cost bigint,
                                description text,
                                "roomCount" integer,
                                area integer NOT NULL,
                                "HouseTypeId" integer,
                                "HousePurposeId" integer,
                                "DistrictId" integer,
                                status boolean DEFAULT true
)
    WITH (autovacuum_enabled='true');


ALTER TABLE public."House" OWNER TO postgres;

--
-- Name: HousePurpose; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."HousePurpose" (
                                       id integer NOT NULL,
                                       name character varying(255) NOT NULL
)
    WITH (autovacuum_enabled='true');


ALTER TABLE public."HousePurpose" OWNER TO postgres;

--
-- Name: HousePurpose_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."HousePurpose_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."HousePurpose_id_seq" OWNER TO postgres;

--
-- Name: HousePurpose_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."HousePurpose_id_seq" OWNED BY public."HousePurpose".id;


--
-- Name: HouseType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."HouseType" (
                                    id integer NOT NULL,
                                    name character varying(255) NOT NULL
)
    WITH (autovacuum_enabled='true');


ALTER TABLE public."HouseType" OWNER TO postgres;

--
-- Name: HouseType_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."HouseType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."HouseType_id_seq" OWNER TO postgres;

--
-- Name: HouseType_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."HouseType_id_seq" OWNED BY public."HouseType".id;


--
-- Name: House_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."House_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."House_id_seq" OWNER TO postgres;

--
-- Name: House_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."House_id_seq" OWNED BY public."House".id;


--
-- Name: sequence_image; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sequence_image
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sequence_image OWNER TO postgres;

--
-- Name: Image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Image" (
                                id integer DEFAULT nextval('public.sequence_image'::regclass) NOT NULL,
                                image_path character varying(255) NOT NULL,
                                size integer,
                                extension character varying(8),
                                "HouseId" integer
)
    WITH (autovacuum_enabled='true');


ALTER TABLE public."Image" OWNER TO postgres;

--
-- Name: Passport; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Passport" (
                                   id integer NOT NULL,
                                   series character varying(4) NOT NULL,
                                   number character varying(6) NOT NULL,
                                   "issuedBy" text,
                                   "issuedDate" date,
                                   birthday date,
                                   "isArchive" boolean DEFAULT false NOT NULL,
                                   "ClientId" integer,
                                   "WorkerId" integer
)
    WITH (autovacuum_enabled='true');


ALTER TABLE public."Passport" OWNER TO postgres;

--
-- Name: Passport_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Passport_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Passport_id_seq" OWNER TO postgres;

--
-- Name: Passport_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Passport_id_seq" OWNED BY public."Passport".id;


--
-- Name: Position; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Position" (
                                   id integer NOT NULL,
                                   name character varying(255) NOT NULL
)
    WITH (autovacuum_enabled='true');


ALTER TABLE public."Position" OWNER TO postgres;

--
-- Name: Position_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Position_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Position_id_seq" OWNER TO postgres;

--
-- Name: Position_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Position_id_seq" OWNED BY public."Position".id;


--
-- Name: Request; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Request" (
                                  id integer NOT NULL,
                                  number character varying(32) NOT NULL,
                                  "createStamp" timestamp without time zone NOT NULL,
                                  "closeStamp" timestamp without time zone,
                                  details text,
                                  "statusUpdateStamp" timestamp without time zone,
                                  "HouseId" integer,
                                  "RequestStateId" integer,
                                  "ClientId" integer,
                                  "RequestTypeId" integer,
                                  "DepartmentId" integer,
                                  "WorkerId" integer
)
    WITH (autovacuum_enabled='true');


ALTER TABLE public."Request" OWNER TO postgres;

--
-- Name: RequestState; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RequestState" (
                                       id integer NOT NULL,
                                       name character varying(255) NOT NULL
)
    WITH (autovacuum_enabled='true');


ALTER TABLE public."RequestState" OWNER TO postgres;

--
-- Name: RequestState_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RequestState_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RequestState_id_seq" OWNER TO postgres;

--
-- Name: RequestState_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RequestState_id_seq" OWNED BY public."RequestState".id;


--
-- Name: RequestType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RequestType" (
                                      id integer NOT NULL,
                                      name character varying(255) NOT NULL
)
    WITH (autovacuum_enabled='true');


ALTER TABLE public."RequestType" OWNER TO postgres;

--
-- Name: RequestType_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RequestType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RequestType_id_seq" OWNER TO postgres;

--
-- Name: RequestType_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RequestType_id_seq" OWNED BY public."RequestType".id;


--
-- Name: Request_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Request_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Request_id_seq" OWNER TO postgres;

--
-- Name: Request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Request_id_seq" OWNED BY public."Request".id;


--
-- Name: Worker; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Worker" (
                                 id integer NOT NULL,
                                 surname character varying(128) NOT NULL,
                                 name character varying(128) NOT NULL,
                                 "secondName" character varying(128),
                                 "DepartmentId" integer,
                                 "PositionId" integer,
                                 password character varying(64),
                                 email character varying(64)
)
    WITH (autovacuum_enabled='true');


ALTER TABLE public."Worker" OWNER TO postgres;

--
-- Name: Worker_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Worker_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Worker_id_seq" OWNER TO postgres;

--
-- Name: Worker_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Worker_id_seq" OWNED BY public."Worker".id;


--
-- Name: City id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."City" ALTER COLUMN id SET DEFAULT nextval('public."City_id_seq"'::regclass);


--
-- Name: Client id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Client" ALTER COLUMN id SET DEFAULT nextval('public."Client_id_seq"'::regclass);


--
-- Name: Department id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Department" ALTER COLUMN id SET DEFAULT nextval('public."Department_id_seq"'::regclass);


--
-- Name: District id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."District" ALTER COLUMN id SET DEFAULT nextval('public."District_id_seq"'::regclass);


--
-- Name: Document id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Document" ALTER COLUMN id SET DEFAULT nextval('public."Document_id_seq"'::regclass);


--
-- Name: DocumentType id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DocumentType" ALTER COLUMN id SET DEFAULT nextval('public."DocumentType_id_seq"'::regclass);


--
-- Name: House id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."House" ALTER COLUMN id SET DEFAULT nextval('public."House_id_seq"'::regclass);


--
-- Name: HousePurpose id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HousePurpose" ALTER COLUMN id SET DEFAULT nextval('public."HousePurpose_id_seq"'::regclass);


--
-- Name: HouseType id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HouseType" ALTER COLUMN id SET DEFAULT nextval('public."HouseType_id_seq"'::regclass);


--
-- Name: Passport id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Passport" ALTER COLUMN id SET DEFAULT nextval('public."Passport_id_seq"'::regclass);


--
-- Name: Position id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Position" ALTER COLUMN id SET DEFAULT nextval('public."Position_id_seq"'::regclass);


--
-- Name: Request id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request" ALTER COLUMN id SET DEFAULT nextval('public."Request_id_seq"'::regclass);


--
-- Name: RequestState id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RequestState" ALTER COLUMN id SET DEFAULT nextval('public."RequestState_id_seq"'::regclass);


--
-- Name: RequestType id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RequestType" ALTER COLUMN id SET DEFAULT nextval('public."RequestType_id_seq"'::regclass);


--
-- Name: Worker id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Worker" ALTER COLUMN id SET DEFAULT nextval('public."Worker_id_seq"'::regclass);


--
-- Data for Name: City; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."City" (id, name) FROM stdin;
16	Москва
17	Барнаул
18	Новосибирск
19	Томск
20	Санкт-Петербург
\.


--
-- Data for Name: Client; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Client" (id, surname, name, "secondName", "phoneNumber", email, password, registration) FROM stdin;
11	petrov	petrov		undefined	petrov	$2a$08$r0..r03TSvbxuGuxON67xO3ezIZjt3DCrlg6l9CIoZf1bYlH21XA.	2024-05-14
9	df	df	df	89130217041	df	$2a$08$G09gLUw//lAi4bN.pcSvFeNbqT9QbVuBPPE2QSvazT.wzUR7/Ek3W	2024-06-12
1	a	b	c	89130217041	d	e	2024-12-16
10	ivanov	ivanov		undefined	ivanov	$2a$08$s5MhS.oSDo2CdXzlu2d9EufPJ.x9SxQO.Lxjd2f/jBhO70Q/Thqlm	2023-12-25
8	qwe	qwe		undefined	qwe	$2a$08$klN9Syv6aHYe48R5h48a0u7x7s3F4qNYmlxfdAY/3G17ucIylTLg2	2024-12-03
6	bcd	bcd		undefined	bcd	$2a$08$mZKDHUXqrc9OZ.D6.yb4duOZQTa5vyiUAdkLK5JjKR8zQWZruAfT6	2023-12-13
\.


--
-- Data for Name: Department; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Department" (id, name) FROM stdin;
1	Риэлтерский отдел
2	Отдел оценки недвижимости
3	Отдел аренды недвижимости
4	Отдел по работе с региональными партнерами
5	Отдел ипотечного кредитования
6	Отдел по добавлению объектов недвижимости
\.


--
-- Data for Name: District; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."District" (id, "Name", "CityId") FROM stdin;
11	Центральный	17
12	Железнодорожный	17
13	Индустриальный	17
14	Ленинский	17
15	Октябрьский	17
16	Дзержинский	18
17	Железнодорожный	18
18	Заельцовский	18
19	Калининский	18
20	Кировский	18
21	Ленинский	18
22	Октябрьский	18
23	Первомайский	18
24	Советский	18
25	Центральный	18
\.


--
-- Data for Name: Document; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Document" (id, "docNumber", "createStamp", "finishStamp", "RequestId", "DocumentTypeId", doc_text) FROM stdin;
1	ааа	2024-12-14 06:16:03.771	\N	1	3	\N
2	1	2024-12-14 09:07:35.8	\N	4	1	\N
3	kk	2024-12-14 09:09:09.138	\N	5	1	\N
4	1	2024-12-16 11:17:27.144	\N	5	1	\N
5	1	2024-12-16 14:16:51.321	\N	5	3	\N
6	1	2024-12-16 14:18:03.165	\N	5	2	\N
7	1	2024-12-16 14:19:40.236	\N	5	1	\N
8	2	2024-12-16 14:21:02.768	\N	5	2	\N
10	13	2024-12-16 14:32:22.564	\N	5	1	text
9	12	2024-12-16 14:30:59.712	\N	5	1	eee hehe
\.


--
-- Data for Name: DocumentType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."DocumentType" (id, "updateStamp", "fileName") FROM stdin;
1	2024-12-14 13:15:27.396637	Заявка
2	2024-12-14 13:15:44.7696	Заявка клиента
3	2024-12-14 13:15:50.645968	Заявка сотрудника
\.


--
-- Data for Name: House; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."House" (id, address, cost, description, "roomCount", area, "HouseTypeId", "HousePurposeId", "DistrictId", status) FROM stdin;
5	hehe, 8	1	hehe	1	1	1	1	17	t
1	Ленина,1:кв1	1000	ffff	2	120	2	1	11	t
2	vvvv	1	vvv	1	1	1	1	11	f
8	f	1	f	1	1	1	1	17	f
6	h	1	h	1	1	1	1	17	f
4	1	1	11	1	1	1	1	17	f
21	1	1	f	1	1	1	1	17	t
3	ff	1	12	1	1	1	1	11	f
40	fff	1	fff	1	1	2	2	11	f
\.


--
-- Data for Name: HousePurpose; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."HousePurpose" (id, name) FROM stdin;
1	Продажа
2	Аренда
\.


--
-- Data for Name: HouseType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."HouseType" (id, name) FROM stdin;
1	Земельный участок
2	Жилое помещение
3	Нежилое помещение
4	Объект незавершенного строительства
\.


--
-- Data for Name: Image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Image" (id, image_path, size, extension, "HouseId") FROM stdin;
\.


--
-- Data for Name: Passport; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Passport" (id, series, number, "issuedBy", "issuedDate", birthday, "isArchive", "ClientId", "WorkerId") FROM stdin;
1	1	1	b	2024-12-02	2024-12-01	t	6	\N
2	2	2	m	2024-12-02	2024-12-01	f	6	\N
3	1111	1111	ssss	2020-01-01	1990-01-01	f	8	\N
4	1111	222222	mvd	2020-01-01	1990-01-01	f	\N	4
\.


--
-- Data for Name: Position; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Position" (id, name) FROM stdin;
1	Начальник
2	Стажер
3	Помощник
4	Бухгалтер
5	Специалист
\.


--
-- Data for Name: Request; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Request" (id, number, "createStamp", "closeStamp", details, "statusUpdateStamp", "HouseId", "RequestStateId", "ClientId", "RequestTypeId", "DepartmentId", "WorkerId") FROM stdin;
1	fff	2024-12-14 12:15:16.006486	\N	fff	2024-12-14 12:15:16.006486	\N	2	1	1	1	\N
2	12	2024-12-14 14:41:47.608183	\N	fff	2024-12-14 14:41:47.608183	\N	2	1	1	1	\N
3	1	2024-12-14 14:55:25.361911	\N	f	2024-12-14 16:07:12.377262	\N	2	1	1	1	\N
4	7015	2024-12-14 15:40:26.223928	\N	fff	2024-12-14 16:07:18.346537	\N	3	1	3	3	\N
5	1788	2024-12-14 16:01:07.402427	\N	fff	2024-12-14 16:01:07.402427	1	4	1	1	1	2
6	8585	2024-12-16 08:42:36.011772	\N	fff	2024-12-16 08:42:36.011772	\N	4	6	1	1	\N
7	6799	2024-12-17 16:06:06.777035	\N	hehe	2024-12-17 16:06:06.777035	\N	4	6	1	3	4
8	2380	2024-12-18 13:37:15.697714	\N	дом хочу продать	2024-12-19 11:06:41.439154	21	2	8	4	6	\N
10	3825	2024-12-19 17:19:27.212928	\N	запрос о важных вещах	2024-12-19 17:19:27.212928	\N	4	9	1	1	\N
11	7069	2024-12-19 17:39:34.201247	\N	дом сдать в аренду	2024-12-19 17:39:34.201247	40	4	10	4	3	\N
13	8989	2024-12-19 17:42:49.611614	\N	хочу арендовать	2024-12-19 17:42:49.611614	40	4	11	3	3	\N
12	3193	2024-12-19 17:41:35.582769	\N	сдать в аренду	2024-12-19 17:43:22.22772	40	2	10	3	3	4
\.


--
-- Data for Name: RequestState; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RequestState" (id, name) FROM stdin;
1	Открыт
2	Закрыт
3	Закончен
4	В обработке
\.


--
-- Data for Name: RequestType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RequestType" (id, name) FROM stdin;
1	Получение кредита
2	Покупка жилья
3	Аренда жилья
4	Добавление объекта
\.


--
-- Data for Name: Worker; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Worker" (id, surname, name, "secondName", "DepartmentId", "PositionId", password, email) FROM stdin;
1	f	f	f	\N	\N	admin	admin
3	this	b	b	1	\N	$2a$08$HjAffeOzm15.UHRPlUeI2.j1t1rMrbB.oBnUw5XRaj6fvKkfAR/eq	f
2	abc	abc	abc	2	3	$2a$08$jlaT/g2BAXgPgfxlmZnCFehTZobAem2VmBSzUtDpq7ZM5PGLZvBVG	abc
4	new	new	new	3	3	$2a$08$IR8t5/K63VGDVWrHCko4neV7peBsmAgNeUtB1n3YmyOabhhn3ESci	new
5	abcd	abcd	abcd	3	\N	$2a$08$ptIDzGuCja9/FPKyDIEl/.2iZjrESZBOJGy5yqph42gLPh.o8pFF2	abcd
\.



--
-- Name: City CityId; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."City"
    ADD CONSTRAINT "CityId" UNIQUE (id);


--
-- Name: Client ClientId; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Client"
    ADD CONSTRAINT "ClientId" UNIQUE (id);


--
-- Name: Department DepartmentId; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Department"
    ADD CONSTRAINT "DepartmentId" UNIQUE (id);


--
-- Name: District DistrictId; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."District"
    ADD CONSTRAINT "DistrictId" UNIQUE (id);


--
-- Name: Document DocumentId; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "DocumentId" UNIQUE (id);


--
-- Name: DocumentType DocumentTypeId; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DocumentType"
    ADD CONSTRAINT "DocumentTypeId" UNIQUE (id);


--
-- Name: House HouseId; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."House"
    ADD CONSTRAINT "HouseId" UNIQUE (id);


--
-- Name: HousePurpose HousePurposeId; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HousePurpose"
    ADD CONSTRAINT "HousePurposeId" UNIQUE (id);


--
-- Name: HouseType HouseTypeId; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HouseType"
    ADD CONSTRAINT "HouseTypeId" UNIQUE (id);


--
-- Name: Image ImageName; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Image"
    ADD CONSTRAINT "ImageName" UNIQUE (id);


--
-- Name: City PK_City; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."City"
    ADD CONSTRAINT "PK_City" PRIMARY KEY (id);


--
-- Name: Client PK_Client; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Client"
    ADD CONSTRAINT "PK_Client" PRIMARY KEY (id);


--
-- Name: Department PK_Department; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Department"
    ADD CONSTRAINT "PK_Department" PRIMARY KEY (id);


--
-- Name: District PK_District; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."District"
    ADD CONSTRAINT "PK_District" PRIMARY KEY (id);


--
-- Name: Document PK_Document; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "PK_Document" PRIMARY KEY (id);


--
-- Name: DocumentType PK_DocumentType; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DocumentType"
    ADD CONSTRAINT "PK_DocumentType" PRIMARY KEY (id);


--
-- Name: House PK_House; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."House"
    ADD CONSTRAINT "PK_House" PRIMARY KEY (id);


--
-- Name: HousePurpose PK_HousePurpose; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HousePurpose"
    ADD CONSTRAINT "PK_HousePurpose" PRIMARY KEY (id);


--
-- Name: HouseType PK_HouseType; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HouseType"
    ADD CONSTRAINT "PK_HouseType" PRIMARY KEY (id);


--
-- Name: Image PK_Image; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Image"
    ADD CONSTRAINT "PK_Image" PRIMARY KEY (id);


--
-- Name: Passport PK_Passport; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Passport"
    ADD CONSTRAINT "PK_Passport" PRIMARY KEY (id);


--
-- Name: Position PK_Position; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Position"
    ADD CONSTRAINT "PK_Position" PRIMARY KEY (id);


--
-- Name: Request PK_Request; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "PK_Request" PRIMARY KEY (id);


--
-- Name: RequestState PK_RequestState; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RequestState"
    ADD CONSTRAINT "PK_RequestState" PRIMARY KEY (id);


--
-- Name: RequestType PK_RequestType; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RequestType"
    ADD CONSTRAINT "PK_RequestType" PRIMARY KEY (id);


--
-- Name: Worker PK_Worker; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Worker"
    ADD CONSTRAINT "PK_Worker" PRIMARY KEY (id);


--
-- Name: Passport PassportId; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Passport"
    ADD CONSTRAINT "PassportId" UNIQUE (id);


--
-- Name: Position PositionId; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Position"
    ADD CONSTRAINT "PositionId" UNIQUE (id);


--
-- Name: Request RequestId; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "RequestId" UNIQUE (id);


--
-- Name: RequestState RequestStateName; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RequestState"
    ADD CONSTRAINT "RequestStateName" UNIQUE (id);


--
-- Name: RequestType RequestTypeId; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RequestType"
    ADD CONSTRAINT "RequestTypeId" UNIQUE (id);


--
-- Name: Worker WorkerId; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Worker"
    ADD CONSTRAINT "WorkerId" UNIQUE (id);


--
-- Name: Image Название; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Image"
    ADD CONSTRAINT "Название" UNIQUE (image_path);


--
-- Name: Request Номер запроса; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Номер запроса" UNIQUE (number);


--
-- Name: IX_Relationship10; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship10" ON public."Request" USING btree ("ClientId");


--
-- Name: IX_Relationship11; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship11" ON public."Request" USING btree ("RequestTypeId");


--
-- Name: IX_Relationship12; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship12" ON public."Request" USING btree ("DepartmentId");


--
-- Name: IX_Relationship13; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship13" ON public."Worker" USING btree ("DepartmentId");


--
-- Name: IX_Relationship14; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship14" ON public."Request" USING btree ("WorkerId");


--
-- Name: IX_Relationship15; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship15" ON public."Document" USING btree ("RequestId");


--
-- Name: IX_Relationship16; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship16" ON public."Passport" USING btree ("ClientId");


--
-- Name: IX_Relationship17; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship17" ON public."Worker" USING btree ("PositionId");


--
-- Name: IX_Relationship18; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship18" ON public."Document" USING btree ("DocumentTypeId");


--
-- Name: IX_Relationship2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship2" ON public."House" USING btree ("HouseTypeId");


--
-- Name: IX_Relationship22; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship22" ON public."Passport" USING btree ("WorkerId");


--
-- Name: IX_Relationship3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship3" ON public."House" USING btree ("HousePurposeId");


--
-- Name: IX_Relationship4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship4" ON public."House" USING btree ("DistrictId");


--
-- Name: IX_Relationship5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship5" ON public."District" USING btree ("CityId");


--
-- Name: IX_Relationship8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship8" ON public."Request" USING btree ("HouseId");


--
-- Name: IX_Relationship9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship9" ON public."Request" USING btree ("RequestStateId");


--
-- Name: fki_HouseId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_HouseId" ON public."Image" USING btree ("HouseId");


--
-- Name: DocumentType DocTypeUpdate; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER "DocTypeUpdate" AFTER INSERT OR UPDATE OF "fileName" ON public."DocumentType" FOR EACH ROW EXECUTE FUNCTION public."docTypeUpdate"();


--
-- Name: Request requestStateUpdateT; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER "requestStateUpdateT" AFTER INSERT OR UPDATE OF "RequestStateId" ON public."Request" FOR EACH ROW EXECUTE FUNCTION public."requestUpdate"();


--
-- Name: Passport updatePassport; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER "updatePassport" BEFORE INSERT ON public."Passport" FOR EACH ROW EXECUTE FUNCTION public."passportArchive"();


--
-- Name: Image HouseId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Image"
    ADD CONSTRAINT "HouseId" FOREIGN KEY ("HouseId") REFERENCES public."House"(id);


--
-- Name: Request Relationship10; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Relationship10" FOREIGN KEY ("ClientId") REFERENCES public."Client"(id);


--
-- Name: Request Relationship11; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Relationship11" FOREIGN KEY ("RequestTypeId") REFERENCES public."RequestType"(id);


--
-- Name: Request Relationship12; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Relationship12" FOREIGN KEY ("DepartmentId") REFERENCES public."Department"(id);


--
-- Name: Worker Relationship13; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Worker"
    ADD CONSTRAINT "Relationship13" FOREIGN KEY ("DepartmentId") REFERENCES public."Department"(id);


--
-- Name: Request Relationship14; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Relationship14" FOREIGN KEY ("WorkerId") REFERENCES public."Worker"(id);


--
-- Name: Document Relationship15; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Relationship15" FOREIGN KEY ("RequestId") REFERENCES public."Request"(id);


--
-- Name: Passport Relationship16; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Passport"
    ADD CONSTRAINT "Relationship16" FOREIGN KEY ("ClientId") REFERENCES public."Client"(id);


--
-- Name: Worker Relationship17; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Worker"
    ADD CONSTRAINT "Relationship17" FOREIGN KEY ("PositionId") REFERENCES public."Position"(id);


--
-- Name: Document Relationship18; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Relationship18" FOREIGN KEY ("DocumentTypeId") REFERENCES public."DocumentType"(id);


--
-- Name: House Relationship2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."House"
    ADD CONSTRAINT "Relationship2" FOREIGN KEY ("HouseTypeId") REFERENCES public."HouseType"(id);


--
-- Name: Passport Relationship22; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Passport"
    ADD CONSTRAINT "Relationship22" FOREIGN KEY ("WorkerId") REFERENCES public."Worker"(id);


--
-- Name: House Relationship3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."House"
    ADD CONSTRAINT "Relationship3" FOREIGN KEY ("HousePurposeId") REFERENCES public."HousePurpose"(id);


--
-- Name: House Relationship4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."House"
    ADD CONSTRAINT "Relationship4" FOREIGN KEY ("DistrictId") REFERENCES public."District"(id);


--
-- Name: District Relationship5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."District"
    ADD CONSTRAINT "Relationship5" FOREIGN KEY ("CityId") REFERENCES public."City"(id);


--
-- Name: Image Relationship7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Image"
    ADD CONSTRAINT "Relationship7" FOREIGN KEY (id) REFERENCES public."House"(id);


--
-- Name: Request Relationship8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Relationship8" FOREIGN KEY ("HouseId") REFERENCES public."House"(id);


--
-- Name: Request Relationship9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Relationship9" FOREIGN KEY ("RequestStateId") REFERENCES public."RequestState"(id);


--
-- PostgreSQL database dump complete
--

