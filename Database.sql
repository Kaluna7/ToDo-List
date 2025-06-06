PGDMP  9                    }            todolist    17.4    17.4      B           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            C           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            D           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            E           1262    16388    todolist    DATABASE     n   CREATE DATABASE todolist WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
    DROP DATABASE todolist;
                     postgres    false            �            1259    16519    personal    TABLE     �   CREATE TABLE public.personal (
    title character varying(255) NOT NULL,
    description text,
    email character varying(255) NOT NULL,
    "time" time without time zone,
    id integer NOT NULL
);
    DROP TABLE public.personal;
       public         heap r       postgres    false            �            1259    24713    personal_id_seq    SEQUENCE     �   CREATE SEQUENCE public.personal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.personal_id_seq;
       public               postgres    false    220            F           0    0    personal_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.personal_id_seq OWNED BY public.personal.id;
          public               postgres    false    224            �            1259    16528    study    TABLE     �   CREATE TABLE public.study (
    title character varying(255) NOT NULL,
    description text,
    email character varying(255) NOT NULL,
    "time" time without time zone,
    id integer NOT NULL
);
    DROP TABLE public.study;
       public         heap r       postgres    false            �            1259    24703    study_id_seq    SEQUENCE     �   CREATE SEQUENCE public.study_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.study_id_seq;
       public               postgres    false    221            G           0    0    study_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.study_id_seq OWNED BY public.study.id;
          public               postgres    false    223            �            1259    16474    tasks    TABLE     �   CREATE TABLE public.tasks (
    user_email character varying(150) NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    is_completed boolean DEFAULT false,
    duedate date
);
    DROP TABLE public.tasks;
       public         heap r       postgres    false            �            1259    16466    users    TABLE     �   CREATE TABLE public.users (
    email character varying(150) NOT NULL,
    first_name character varying(100),
    last_name character varying(100),
    password text NOT NULL,
    data jsonb
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    16510    work    TABLE     �   CREATE TABLE public.work (
    title character varying(255) NOT NULL,
    description text,
    email character varying(255) NOT NULL,
    "time" time without time zone,
    id integer NOT NULL
);
    DROP TABLE public.work;
       public         heap r       postgres    false            �            1259    24693    work_id_seq    SEQUENCE     �   CREATE SEQUENCE public.work_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.work_id_seq;
       public               postgres    false    219            H           0    0    work_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.work_id_seq OWNED BY public.work.id;
          public               postgres    false    222            �           2604    24714    personal id    DEFAULT     j   ALTER TABLE ONLY public.personal ALTER COLUMN id SET DEFAULT nextval('public.personal_id_seq'::regclass);
 :   ALTER TABLE public.personal ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    220            �           2604    24704    study id    DEFAULT     d   ALTER TABLE ONLY public.study ALTER COLUMN id SET DEFAULT nextval('public.study_id_seq'::regclass);
 7   ALTER TABLE public.study ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    223    221            �           2604    24694    work id    DEFAULT     b   ALTER TABLE ONLY public.work ALTER COLUMN id SET DEFAULT nextval('public.work_id_seq'::regclass);
 6   ALTER TABLE public.work ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    219            ;          0    16519    personal 
   TABLE DATA           I   COPY public.personal (title, description, email, "time", id) FROM stdin;
    public               postgres    false    220   F"       <          0    16528    study 
   TABLE DATA           F   COPY public.study (title, description, email, "time", id) FROM stdin;
    public               postgres    false    221   �"       9          0    16474    tasks 
   TABLE DATA           V   COPY public.tasks (user_email, title, description, is_completed, duedate) FROM stdin;
    public               postgres    false    218   �"       8          0    16466    users 
   TABLE DATA           M   COPY public.users (email, first_name, last_name, password, data) FROM stdin;
    public               postgres    false    217   L#       :          0    16510    work 
   TABLE DATA           E   COPY public.work (title, description, email, "time", id) FROM stdin;
    public               postgres    false    219   |$       I           0    0    personal_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.personal_id_seq', 2, true);
          public               postgres    false    224            J           0    0    study_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.study_id_seq', 2, true);
          public               postgres    false    223            K           0    0    work_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.work_id_seq', 7, true);
          public               postgres    false    222            �           2606    24716    personal personal_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.personal
    ADD CONSTRAINT personal_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.personal DROP CONSTRAINT personal_pkey;
       public                 postgres    false    220            �           2606    24706    study study_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.study
    ADD CONSTRAINT study_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.study DROP CONSTRAINT study_pkey;
       public                 postgres    false    221            �           2606    16482    tasks tasks_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (user_email, title);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public                 postgres    false    218    218            �           2606    16473    users users_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    217            �           2606    24696    work work_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.work
    ADD CONSTRAINT work_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.work DROP CONSTRAINT work_pkey;
       public                 postgres    false    219            �           2606    16483    tasks tasks_user_email_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_user_email_fkey FOREIGN KEY (user_email) REFERENCES public.users(email) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_user_email_fkey;
       public               postgres    false    218    217    4765            ;   0   x�+I-.�,ى9�y�鹉�9z�����V�FV��\1z\\\ C9S      <   3   x�+I-.Q0�,RƜى9�y�鹉�9z�����FV@d`�i����� ^��      9   s   x��N�)�KtH�M���K����M�N��9���i�1~\��*|�*��BJj^:����8��-5/�2I����#'�ԜD�����������1������<5�* �r#s�=... 0�X7      8      x�U��r�0 ��5<��@Av������T7A�	��Ƨom�S�>3���m�4�Mkdk�P��AT
�ޔ%�������.���M���s\�J7ؒv������x!7�]�]���+,��iX*����U"/9�����"ůo����b��i��R�Byk76��B���6�iJ�hI݊�4����q9�����1l�O���G����4��`�7�^2�(��9�;(�W�����Q>�~6H��Y���Y�;�Z<8Nv*�$��`�!��g����UU?S�{�      :   /   x�+NIL���ĜҼD��������\NC#+C+Ns�=... �:     