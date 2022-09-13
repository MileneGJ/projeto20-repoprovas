-- módulos do curso
INSERT INTO "Terms" ("number") VALUES (1);
INSERT INTO "Terms" ("number") VALUES (2);
INSERT INTO "Terms" ("number") VALUES (3);
INSERT INTO "Terms" ("number") VALUES (4);
INSERT INTO "Terms" ("number") VALUES (5);
INSERT INTO "Terms" ("number") VALUES (6);

-- tipos de provas
INSERT INTO "Categories" ("name") VALUES ('Projeto');
INSERT INTO "Categories" ("name") VALUES ('Prática');
INSERT INTO "Categories" ("name") VALUES ('Recuperação');

-- professores(as)
INSERT INTO "Teachers" ("name") VALUES ('Diego Pinho');
INSERT INTO "Teachers" ("name") VALUES ('Bruna Hamori');

-- disciplinas
INSERT INTO "Disciplines" ("name", "termId") VALUES ('HTML e CSS', 1);
INSERT INTO "Disciplines" ("name", "termId") VALUES ('JavaScript', 2);
INSERT INTO "Disciplines" ("name", "termId") VALUES ('React', 3);
INSERT INTO "Disciplines" ("name", "termId") VALUES ('Humildade', 1);
INSERT INTO "Disciplines" ("name", "termId") VALUES ('Planejamento', 2);
INSERT INTO "Disciplines" ("name", "termId") VALUES ('Autoconfiança', 3);

-- professores(as) e disciplinas
INSERT INTO "TeachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 1);
INSERT INTO "TeachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 2);
INSERT INTO "TeachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 3); 
INSERT INTO "TeachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 4);
INSERT INTO "TeachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 5);
INSERT INTO "TeachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 6);